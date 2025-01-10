function getWeather() {
   const apiKey = 'bcc98e684aa22350d21971c0457a5751';
   const city = document.getElementById('city').value;
   
   if (!city) {
    alert ('Please enter a city');
    return;
   }

   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

   fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
        
    })
    .catch(error => {
        console.log('Error fetching weather data', error);
        alert('Error fetching weather data.');
    })

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.log('Error fetching hourly forecast data', error);
        alert('Error fetching hourly forecast data.');
    })
}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon'); 
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const details = document.getElementById('details');
    const cityName = document.getElementById('city-name');


    clearContents([temperature, cityName, humidity, wind, details]);

    if (data.cod === '404') {
        details.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityValue = data.name;
        const temperatureValue = Math.round((data.main.temp - 273.15) * 9/5 + 32);
        const detailsValue = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidityValue = data.main.humidity + '%';
        const windValue = data.wind.speed + ' km/h';
       

        temperature.innerHTML = `<p>${temperatureValue}°F</p>`;
        cityName.innerHTML = `<p>${cityValue}</p>`;
        humidity.innerHTML = `<p>${humidityValue}</p>`;
        wind.innerHTML = `<p>${windValue}</p>`;
        details.innerHTML = `<p>${detailsValue}`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = detailsValue;

        showImage();
    }   
}

function clearContents(elements) {
    elements.forEach(element => element.innerHTML = '');
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById('hourly-forecast');
    
    hourlyForecast.innerHTML = '';

    const next24 = hourlyData.slice(0,4);

    next24.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hours = dateTime.getHours();
        const temperature = Math.round((item.main.temp - 273.15) * 9/5 + 32);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        hourlyForecast.innerHTML += `
        <div class="hourly-item">
            <span>${hours}:00</span>
            <img src=${iconUrl} alt="Hour Icon">
            <span>${temperature}°F</span>
        </div>`
    });
}