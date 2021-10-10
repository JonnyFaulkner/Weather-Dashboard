const searchForm = document.querySelector(".search-form")
let weatherSearchEl = document.querySelector(".form-input")
const currentWeatherContainerEl = document.querySelector(".current-weather-cont")
const fiveDayContainerEl = document.querySelector(".five-day-container")
const prevSearch = []

const searchFormHandler = function (event) {
    event.preventDefault()

    let searchTerm = weatherSearchEl.value

    const currentWeatherSearch = function () {
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=337d9663ae9ae15879fc108f5788dcf9";

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        displayCurrentWeather(data)
                        prevSearch.push({
                            city: searchTerm
                        })
                        localStorage.setItem("prev-search", JSON.stringify(prevSearch))
                    });
                } else {
                    alert("No weather data found")
                }
            })
            .catch(function (error) {
                alert("Unable to connect to weather api.")
            })
    }

    const displayCurrentWeather = function (data) {
        const currentWeatherEl = document.createElement("div");
        const cityNameEl = document.createElement("h3");
        cityNameEl.textContent = data.name;
        const tempEl = document.createElement("p");
        tempEl.textContent = data.main.temp + " F";
        const weatherEl = document.createElement("p");
        weatherEl.textContent = data.weather[0].description;
        const feelsLikeEl = document.createElement("p");
        feelsLikeEl.textContent = "Feels like: " + data.main.feels_like;
        const minTempEl = document.createElement("p");
        minTempEl.textContent = "Low: " + data.main.temp_min
        const maxTempEl = document.createElement("p")
        maxTempEl.textContent = "High: " + data.main.temp_max
        currentWeatherEl.appendChild(cityNameEl)
        currentWeatherEl.appendChild(tempEl)
        currentWeatherEl.appendChild(weatherEl)
        currentWeatherEl.appendChild(feelsLikeEl)
        currentWeatherEl.appendChild(minTempEl)
        currentWeatherEl.appendChild(maxTempEl)
        currentWeatherContainerEl.appendChild(currentWeatherEl)
    }

    const fiveDayWeatherSearch = function () {
        const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=imperial&appid=3bb3dda59ab6758cae74ad8d9a9a307d";

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        displayFiveDay(data)
                    })
                } else {
                    alert("No weather data found")
                }
            })
            .catch(function (error) {
                alert("Unable to connect to weather api")
            })
    }

    const displayFiveDay = function (data) {

    }

    currentWeatherSearch()
    fiveDayWeatherSearch()

    weatherSearchEl.textContent = ""

}

searchForm.addEventListener("submit", searchFormHandler)