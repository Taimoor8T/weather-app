"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "c4a61aa1ff03d563ad33f63be4c58b8c";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const spinner = document.getElementById("spinner");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const modeToggle = document.getElementById("mode-toggle");
const modeLabel = document.getElementById("mode-label");
function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        spinner.style.display = "block";
        weatherInfo.classList.add("hidden");
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok)
                throw new Error("City not found");
            const data = yield response.json();
            cityName.textContent = data.name;
            temperature.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
            description.textContent = `📖 ${data.weather[0].description}`;
            weatherIcon.src = getWeatherIconUrl(data.weather[0].icon);
            weatherIcon.alt = data.weather[0].description;
            weatherInfo.classList.remove("hidden");
        }
        catch (error) {
            alert("City not found or error fetching data.");
            weatherInfo.classList.add("hidden");
        }
        finally {
            spinner.style.display = "none";
        }
    });
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city)
        return;
    fetchWeather(city);
});
modeToggle.addEventListener("change", () => {
    const isDark = modeToggle.checked;
    const body = document.body;
    if (isDark) {
        body.classList.remove("light");
        body.classList.add("dark");
        modeLabel.textContent = "Dark Mode";
    }
    else {
        body.classList.remove("dark");
        body.classList.add("light");
        modeLabel.textContent = "Light Mode";
    }
});
