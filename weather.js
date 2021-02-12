const weather = document.querySelector(".js-weather");
const weatherMax = document.querySelector(".js-max");
const weatherMin = document.querySelector(".js-min");

const API_KEY = "edf4351c35a2e00531b4edcd70a2d81c";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
       const temparature = json.main.temp;
       const temFix = temparature.toFixed(1);
       const place = json.name;
       const max = json.main.temp_max;
       const maxFix = max.toFixed(1);
       const min = json.main.temp_min;
       const minFix = min.toFixed(1);
       weather.innerText = 
       `Now ${temFix}°C in ${place}`;
       weatherMax.innerText=`🔺 Max ${maxFix} °C`;
       weatherMin.innerText=`🔻 Min ${minFix} °C`;

    })

}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}
function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
       const parseCoords = JSON.parse(loadedCoords);
       getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init(){
    loadCoords();

}

init();