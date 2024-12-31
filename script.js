const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "86d25ab65813d90d448b071e208e3fb6"; // API key for OpenWeatherMap API

 const createWeathercard = (cityName, weatherItem, index) => {
    if(index === 0) {// HTML for the main weather card
        return '<div class = "details">
           <h2>${cityName} (${weatherItem.dt_txt.split("")[0]})</h2>
           <h4>Temprature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
           <h4>wind: ${weatherItem.wind.speed} M/S</h4>
           <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </div>
    } else { //HTML for the other five day forecast card  
        <div class="icon">
            <img src="image.jpg"alt="weather-icon"></img>
            <h4>${weatherItem.weather[0].description}</h4>
        </div>';
         '<li class="card">
            <h3>(${weatherItem.dt_txt.split("  ")[0]})</h3>
            <h4> Temp:${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
            <h4>wind: ${weatherItem.wind,speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>';
    }
}
    

const getWeatherDetails =(cityName,lat,lon) => {
    const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}';

    fetch(WEATHER_API_URL).then(res=> res.josn()).then(data => {
            //Filter the forecast to get only one forecast per day
    const uniqueForecastDays =[];    
     const fiveDaysForecast = data.list.filter(forecast => {
            const forecast = new Date(forecast.dt_tvt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
               return uniqueForecastDays.push(forecastDate);
            }
        });

        //creating weather cards and adding them the DOM
        fiveDaysForecast.forEach(weatherItem => {
            createWeathercard(weatherItem);
        });
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}
// Function to get city coordinates
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user-entered city name and remove extra spaces
    if (!cityName) return; // Return if name is empty
 
    const GEOCODING_API_URL = https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY};
 
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            if (!data.length) return alert(No coordinates found for ${cityName}); // Corrected the alert message
            const { Name,lat, lon } = data[0]; // Destructuring to get lat and lon
            console.log(Name: ${Nam},Latitude: ${lat}, Longitude: ${lon},); // Log the coordinates or use them as needed
            getWeatherDetails(Name,lat, lon);
            // You can proceed to fetch weather data here using lat and lon
        })
        .catch(() => {
            alert("An error occurred while fetching the coordinates!");
        });
};
 
searchButton.addEventListener("click", getCityCoordinates);