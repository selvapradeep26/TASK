import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  // Fake API: Simulate fetching weather data for the city
  const fakeApiCall = (cityName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cityName) {
          resolve(generateFakeWeatherData(cityName));
        } else {
          reject("City not found!");
        }
      }, 1000); // Simulating API delay
    });
  };

  // Function to generate fake weather data for any city
  const generateFakeWeatherData = (cityName) => {
    return {
      city: cityName,
      temperature: Math.floor(Math.random() * 26) + 10, // Random temp between 10°C and 35°C
      condition: ["Sunny", "Cloudy", "Rainy", "Clear", "Partly Cloudy"][
        Math.floor(Math.random() * 5)
      ],
      uvIndex: Math.floor(Math.random() * 9) + 1, // UV index between 1 and 9
      humidity: Math.floor(Math.random() * 100), // Humidity percentage
      windSpeed: Math.floor(Math.random() * 15) + 1, // Wind speed between 1 and 15 km/h
      visibility: Math.floor(Math.random() * 10) + 2, // Visibility between 2 and 10 km
    };
  };

  // Function to handle API fetch
  const fetchWeatherData = async () => {
    const normalizedCity = city.trim().toLowerCase();

    try {
      const data = await fakeApiCall(normalizedCity);
      setWeatherData(data);
      setError(""); // Clear previous error
    } catch (err) {
      setError(err);
      setWeatherData(null); // Clear previous data on error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="city-search"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-details">
          <div className="weather-header">
            <h2 className="city-name">{weatherData.city}</h2>
            <p className="weather-condition">{weatherData.condition}</p>
          </div>

          <div className="weather-info">
            <div className="weather-item">
              <p className="weather-label">Temperature:</p>
              <p className="weather-value">{weatherData.temperature}°C</p>
            </div>

            <div className="weather-item">
              <p className="weather-label">UV Index:</p>
              <p className="weather-value">{weatherData.uvIndex}</p>
            </div>

            <div className="weather-item">
              <p className="weather-label">Humidity:</p>
              <p className="weather-value">{weatherData.humidity}%</p>
            </div>

            <div className="weather-item">
              <p className="weather-label">Wind Speed:</p>
              <p className="weather-value">{weatherData.windSpeed} km/h</p>
            </div>

            <div className="weather-item">
              <p className="weather-label">Visibility:</p>
              <p className="weather-value">{weatherData.visibility} km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
