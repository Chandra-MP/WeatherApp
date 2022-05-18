import React from "react";
import "../App.css";
import { useEffect, useState } from "react";


const search = require("../images/search.png");
const humid = require("../images/humid.png");
const realfeel = require('../images/realfeel.png');
const maxtemp = require('../images/maxtemp.gif');
const mintemp = require('../images/mintemp.gif')

export default function Mainbody() {
    
  let apiKey = "3fe790bc0c43f6c8b6520b54ef4d3760";

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState([]);

  const [location, setLocation] = useState("");

//   const [latitude, setLatitude] = useState(0);

//   const [longitude, setLongitude] = useState(0);

  const iconsrc = "http://openweathermap.org/img/wn/"+ weather.map((data) => data.weather.map((data) => data.icon))+"@2x.png" ;




  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setCity('');
  };

  const getData = function () {
    const latandlong = async (callBack) => {
      await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          city +
          "&appid=" +
          apiKey
      )
        .then((response) => {
          if (!response.ok) throw new Error("Http error :", response.status);
          return response.json();
        })
        .then((data) => {
          console.log(data.lat, data.lon);
          callBack(data);
          return data;
        })
        .finally(() => console.log("fetched the Data!"))
        .catch((err) => console.log(err));
    };

    latandlong((result) => {
      console.log(result);

    //   setLatitude(result.map((x) => x.lat));
    //   setLongitude(result.map((x) => x.lon));
      setLocation(result.map((x) => x.name));

      console.log(
        result.map((x) => x.lat),
        result.map((x) => x.lon)
      );

      getWeatherData(
        result.map((x) => x.lat),
        result.map((x) => x.lon),
        (result) => {
          setWeather([result]);
          console.log(result);
        }
      );
    });

    const getWeatherData = async function (latw, lonw, callBack) {
      await fetch(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          latw +
          "&lon=" +
          lonw +
          "&units=metric&appid=" +
          apiKey
      )
        .then((response) => {
          if (!response.ok) throw new Error("Http Error: ", response.status);
          return response.json();
        })
        .then((data) => {
          callBack(data);
          return data;
        });
    };
  };





  return (
    <div className="mainbodywrapper container-fluid">
      <div className="weathercard">
        <div className="row searchbar">
          <form className="searchform" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="searchinput"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="searchbtn">
              <p>
                <img src={search} alt="searchlogo" className="src" />
              </p>
            </button>
          </form>
        </div>

        <div className="row weatherdetails">
          <div className="col-8">
            <div className="weatherstats">
              <p>
                <span className="location">
                  {location}, {weather.map((data) => data.sys.country)}
                </span>
                <br />
                <span className="temperature">
                  {Math.floor(weather.map((data) => data.main.temp))}°<span>C</span>

                </span>
              </p> 
              <hr />
              <div className="row subweather">
                <div className="col-3">
                    <img src={humid}alt="humidity" className="humid" title="Humidity"/>
                    {weather.map((data)=>data.main.humidity) }%</div>
               
                <div className="col-3">
                    <img src={realfeel} alt="Real-Feel" className="feels" />
                    {Math.floor(weather.map((data)=>data.main.feels_like))}°C</div>

                <div className="col-3">
                    <img src={maxtemp} alt="Max Temperature" className="maxtemp" />
                   {Math.floor(weather.map((data)=>data.main.temp_max))}°C 
                    
                </div>
                <div className="col-3">
                <img src={mintemp} alt="Min Temperature" className="mintemp" />
                {Math.floor(weather.map((data)=>data.main.temp_min))}°C
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 weathericons">
          <img src={iconsrc} alt="" className="iconsrc"/>
          <br />
            <span>
            {weather.map((data) => data.weather.map((data) => data.main))}  
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
