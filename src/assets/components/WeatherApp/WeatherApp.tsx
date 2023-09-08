import "./WeatherApp.css";
import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    const cordinates: any = {};

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=cefe1c2450d4bcee78563adf8f67211b`
      )
      .then((res: any) => {
        cordinates.lat = res.data[0].lat;
        cordinates.lon = res.data[0].lon;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=cefe1c2450d4bcee78563adf8f67211b`
          )
          .then((res) => {
            setTemperature((res.data.main.temp - 273.15).toFixed(2));
          });
      });
  };

  return (
    <div className="container">
      <div className="search-bar">
        <div>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <div className="button">
          <button onClick={handleSearch}> Search</button>
        </div>
      </div>
      <div className="temp">
        <p>Temperature: {temperature}°C</p>
      </div>
    </div>
  );
}
export default WeatherApp;
