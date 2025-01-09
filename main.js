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
        // displayWeather(data);
        console.log("Weather data:", data)
    })
    .catch(error => {
        console.log('Error fetching weather data', error);
        alert('Error fetching weather data.');
    })

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        // displayHourlyForcase(data.list);
        console.log("Weather data:", data.list)
    })
    .catch(error => {
        console.log('Error fetching hourly forecast data', error);
        alert('Error fetching hourly forecast data.');
    })
}

// function displayWeather(data) {
    
// }