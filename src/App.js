import React, {useState, useEffect } from 'react'
import moment from 'moment-timezone'
import Date from './Components/Date/Date'
import Hour from './Components/Hour/Hour'
import City from './Components/City/City'
import WeatherMenu from './Components/WeatherMenu/WeatherMenu.jsx'
import Search from './Components/Search/Search.jsx'
import Alert from './Components/Alert/Alert'
import axios from 'axios'
import './app.css'

function App() {
  
  const apiKey = "b0bd1841c6983f5d4bc5fb424b9ded68"
  const [celsius, setCelsius] = useState()
  const [city, setCity] = useState()
  const [mycity, setMycity] = useState()
  const [myCountry, setMyCountry] = useState()
  const [load, setLoad] = useState(false)
  const [date, setDate] = useState()
  const [hour, setHour] = useState('Loading..')
  const [forecasts, setForecasts] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  useEffect(() => {
    if (latitude && longitude) {
     
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`).then((response) => {
        if(response && response.status === 200){
          populateForecastsData(response.data);  
        }
      }); 

    }
  }, [latitude, longitude]);

  const populateForecastsData = (json) =>{ 
    setCelsius(json.current.temp);      
    setForecasts(json.daily);

    const hours = moment().tz(json.timezone).format().match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/g); 
    const Date = moment().tz(json.timezone).format("LLLL");
    
    setDate(Date);
    setHour(hours);
  }

  const populateLocation = (json) =>{
    setMycity(json.name);
    setMyCountry(json.country);
    setLatitude(json.lat);
    setLongitude(json.lon);
  }   

  const populateCurrentLocation = (latitude, longitude) =>{
    
    axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`).then((response) => {
      if(response && response.status === 200){
          populateLocation(response.data[0]); 
      }
    });

    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`).then((response) => {
      if(response && response.status === 200){
        populateForecastsData(response.data); 
      }
    });      
  } 

  if(load === false){ //Runs only once, with the user's location
    
    setLoad(true)

    navigator.geolocation.getCurrentPosition(function(position) {
      populateCurrentLocation(position.coords.latitude, position.coords.longitude);     
    });
    
  }

  const handleClick = (city) =>{// When clicking, get the input city and search in the api
    if(!city){
      alert('Need a city');
      return false;
    }

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=1&appid=${apiKey}`).then((response) => {
        if(response && response.status === 200){
          populateLocation(response.data[0]); 
        }
      }); 
    
  }

  const handleChange = (e) =>{
      setCity(e.target.value);      
  }

  return (
    <div className='container'> 
      <Alert show={ !latitude && !longitude } />
      <div className='painel'>
          <div className="left-side">
            <Hour hour={hour}></Hour>
            <Date date={date}/>
          </div>
          <div className="right-side">
          <Search change={handleChange} onclick={() => handleClick(city)}/>
              <City cityname={mycity} countryname={myCountry}/>
          </div>
      </div>
      <WeatherMenu celsius={celsius} forecasts={forecasts}/>
    </div>
  );
}

export default App;
