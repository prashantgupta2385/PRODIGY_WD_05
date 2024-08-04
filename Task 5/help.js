const apiKey = "d1238deb2796c209b74f9896808490d9"; // Weather API key
const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-name");
const weatherDataEle = document.querySelector("#weather-data");
const imgIcon = document.querySelector("#imgIcon");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission
    const cityValue = cityInput.value;
    if (cityValue) {
        console.log(`Fetching weather data for: ${cityValue}`);
        await getWeatherData(cityValue);
    } else {
        console.error("City name cannot be empty");
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Debugging statement

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => {
            return `<div>${detail}</div>`;
        }).join("");

    } catch (err) {
        console.error(`Error fetching weather data: ${err.message}`);
        weatherDataEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!";
        weatherDataEle.querySelector(".details").innerHTML = "";
    }
}
