//API 91d4c7a847e36aaa33ef6d7c116eef96


//Elements

const iconElement = document.querySelector('.weather-icon')  
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

//App Data
const weather ={};
weather.temperature = { 
    unit: 'celsius' 
};

// Const and Variables 
const KELVIN = 273;
const key = '91d4c7a847e36aaa33ef6d7c116eef96';

//Check if the browser support GEO
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> Браузер не поддерживает Геолокацию`
}

// Set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

// Show error when we have issue with GEO service
function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message}`
}

//Get weather from API
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(data);
        console.log(weather.iconId);

    })
    .then(function(){
        displayWeather();
    });
}

//Display Weather to UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}