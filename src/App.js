import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Date from "./Components/Date/Date";
import Hour from "./Components/Hour/Hour";
import City from "./Components/City/City";
import WeatherMenu from "./Components/WeatherMenu/WeatherMenu.jsx";
import Search from "./Components/Search/Search.jsx";
import axios from "axios";
import "./app.css";

function App() {
  const apiKey = "b0bd1841c6983f5d4bc5fb424b9ded68";
  const [cityInput, setCityInput] = useState();
  const [forecast, setForecast] = useState({
    degree: undefined,
    date: undefined,
    hour: undefined,
    forecasts: [],
  });
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
    city: undefined,
    country: undefined,
  });

  useEffect(() => {
    if (!location.latitude) {
      navigator.geolocation.getCurrentPosition(function (position) {
        populateCurrentLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`)
        .then((response) => {
          if (response && response.status === 200) {
            populateForecastsData(response.data);
          }
        });
    }
  }, [location]);

  const populateForecastsData = (json) => {
    const hour = moment().tz(json.timezone).format().match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/g);
    const date = moment().tz(json.timezone).format("LLLL");

    setForecast({
      degree: json.current.temp,
      date,
      hour,
      forecasts: json.daily,
    });
  };

  const populateLocation = (json) => {
    setLocation({
      latitude: json.lat,
      longitude: json.lon,
      city: json.name,
      country: json.country,
    });
  };

  const populateCurrentLocation = (latitude, longitude) => {    
    axios
      .get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)
      .then((response) => {
        if (response && response.status === 200 && response.data.length > 0) {
          populateLocation(response.data[0]);
        }
      });
  };

  const handleClick = () => {
    if (cityInput.length === 0) {
      alert("Need a city");
      return false;
    }

    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}}&limit=1&appid=${apiKey}`)
      .then((response) => {
        if (response && response.status === 200) {
          populateLocation(response.data[0]);
        }
      });
  };

  const handleChange = (e) => {
    setCityInput(e.target.value);
  };

  const { city, country } = location;
  const { hour, date, degree, forecasts } = forecast;

  return (
    <div className="container">
      <div className="painel">
        <div className="left-side">
          <Hour hour={hour}></Hour>
          <Date date={date} />
        </div>
        <div className="right-side">
          <Search change={handleChange} onclick={() => handleClick()} />
          <City cityname={city} countryname={country} />
        </div>
      </div>
      <WeatherMenu celsius={degree} forecasts={forecasts} />
    </div>
  );
}

export default App;
