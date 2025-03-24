// Store the API key for OpenWeatherMap
const apiKey = "YOUR_API_KEY";  // Replace this with your actual OpenWeatherMap API key

// Get references to HTML elements
const fetchWeatherButton = document.getElementById('fetch-weather');  // Button to trigger the weather fetch
const cityInput = document.getElementById('city-input');  // Text input where the user enters the city name
const weatherResult = document.getElementById('weather-result');  // Div where the weather data will be displayed
const cityName = document.getElementById('city-name');  // Element to display the city name
const weatherDescription = document.getElementById('weather-description');  // Element to display the weather description
const temperature = document.getElementById('temperature');  // Element to display the temperature
const humidity = document.getElementById('humidity');  // Element to display the humidity level

// Function to fetch weather data from OpenWeatherMap API
const fetchWeather = async () => {
    const city = cityInput.value.trim();  // Get the city name from the input and remove extra spaces

    // Check if city is empty
    if (city === "") {
        alert("Please enter a city name.");  // Alert if no city is entered
        return;
    }

    // Construct the API URL to fetch weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);  // Make the API call to get weather data
        const data = await response.json();  // Parse the response into JSON

        // If the API returns an error (e.g., city not found), display an error message
        if (data.cod !== 200) {
            alert(data.message);  // Show error message from the API
            return;
        }

        // Update the HTML elements with the weather data
        cityName.innerText = `${data.name}, ${data.sys.country}`;  // Display city name and country code
        weatherDescription.innerText = `Weather: ${data.weather[0].description}`;  // Display weather description (e.g., clear sky)
        temperature.innerText = `Temperature: ${data.main.temp} °C`;  // Display temperature in Celsius
        humidity.innerText = `Humidity: ${data.main.humidity}%`;  // Display humidity level

        // Make the weather result div visible
        weatherResult.style.display = "block";
    } catch (error) {
        alert("Error fetching weather data.");  // Display an alert if there's an error with the API call
    }
};

// Event listener for the "Get Weather" button
fetchWeatherButton.addEventListener('click', fetchWeather);
