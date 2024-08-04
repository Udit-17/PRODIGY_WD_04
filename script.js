const apiKey = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3391b6f6795b0bec8e5fdfeb9d24b31d'; // Replace with your actual OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeather(location);
    }
});

document.getElementById('currentLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather data from:", url); // Debugging step to verify the URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather data from:", url); // Debugging step to verify the URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherInfo = document.querySelector('.weather-info');

    if (data.cod === '404') {
        alert('Location not found');
        return;
    }

    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = 'block';
}
