import React, { useState } from 'react';
import './App.css';
//giving the api key in the form of objects to access them later
const api = {
  key: '7f3376673b0c42feffdf9b1d57f8047d',
  base: "http://api.openweathermap.org/data/2.5/"
}
//its the class function 
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
//adding event listener to the enter button and fetching the api during the event
//the object name is given as weather to access the weathe elements from the api
  const search = evt =>{
    if (evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result=>{setWeather(result); setQuery(''); console.log(result)});
    }
  }
  //using date builder to get all the dates to display in the app
  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  //returning the skeleton of the app view in return 
  return (
    <div className="container">
      <main>
      <div className="search-box">
        <input className="search-bar" type="text" onChange={e=>setQuery(e.target.value)} value={query} onKeyPress={search}/>
      </div>
      {(typeof weather.main!="undefined") ? (
      <div className="weather-data">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
        <div className="temperature">{Math.round(weather.main.temp)}°C</div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
      ) : ('')}
      </main>
    </div>

  );
}

export default App;