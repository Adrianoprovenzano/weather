const api = {
  key: "b965186ea161a688175dcd9a32a08fea",
  base: "https://api.openweathermap.org/data/2.5/"
}

//get geoInfo

window.addEventListener('load', geoFindMe);

function geoFindMe() {
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`) 
    .then(weather => {
      return weather.json();
    }).then(displayResults);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}




//finish


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`) 
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`; 

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  var iconurl = "https://openweathermap.org/img/w/" + `${weather.weather[0].icon}` + ".png";
  document.getElementById('wicon').setAttribute('src', iconurl);


  weather_el.innerText = 'Cloudyness ' + `${weather.clouds.all}` + '%';

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `min ${Math.round(weather.main.temp_min)}°c / max ${Math.round(weather.main.temp_max)}°c`;

  console.log(weather);
  var cloud = Math.round(weather.clouds.all);
  var temperature = Math.round(weather.clouds.all);
  var bdy = document.getElementById('body');

  var hour = now.getHours();

  if(hour >= 20){
    bdy.style.background= "url('dark.jpg') no-repeat center center/cover";
  }

  if(cloud >= 60){
    bdy.style.background= "url('rain.jpg') no-repeat center center/cover";
  }else if(cloud <= 59) {
    bdy.style.background= "url('bg.jpg') no-repeat center center/cover";
  }else if(temperature >= 30){
    bdy.style.background= "url('deserto.jpg') no-repeat center center/cover";
  }else{
    bdy.style.background= "url('bg.jpg') no-repeat center center/cover";
  }


  if(hour >= 20){
    bdy.style.background= "url('dark.jpg') no-repeat center center/cover";
  }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
