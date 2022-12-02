import React, { useRef, useState } from 'react';
import './App.css';
import "bootstrap";
import "@popperjs/core";
import NavBar from './Components/NavBar/NavBar';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
// import { JsonData } from './Utils/FakeWeatherData';
import { GlobalContext } from './Utils/GlobalContext';
import { FetchData } from './Utils/FetchData';

function App() {
  
  const city=useRef('');
  const [isValid,setIsValid]=useState(true);
  const [weatherData,setWeatherData]=useState([{
    "description":"",
    "temp":0,
    "temp_min":0,
    "temp_max":0,
    "Humedity":0,
    "Pressure":0,
    "time":"",
    "image":""
  }])
  
  async function fetchWeather(){
    const weather=await FetchData(`http://api.openweathermap.org/data/2.5/forecast?q=${city.current}&cnt=8&units=metric&appid=226a74f4ac80f378ef1532bd2d6fe907`,"GET")
    if(weather.status===200){
      setIsValid(true);
    let dataSet=[];
    for(let i=0;i<8;i++){
      let id=weather.data.list[i].weather[0].id;
      let imgSrc='';
      switch(true){
        case (id<300):
            imgSrc='./img/weather-icons/storm.png';
            break;
          case (id>=300 && id<500):
            imgSrc='./img/weather-icons/drizzle.png';
            break;
          case (id>=500 && id<600):
            imgSrc='./img/weather-icons/rain.png';
            break;
          case (id>=600 && id<700):
            imgSrc='./img/weather-icons/snow.png';
            break;
          case (id>=700 && id<800):
            imgSrc='./img/weather-icons/fog.png';
            break;
          case (id===800):
            imgSrc='./img/weather-icons/clear.png';
            break;
          case (id===801):
            imgSrc='./img/weather-icons/partlycloudy.png';
            break;
          case (id>801 && id<805):
            imgSrc='./img/weather-icons/mostlycloudy.png';
            break;
          default:
            imgSrc='./img/weather-icons/unknown.png';
            break; 
      }      

      dataSet[i]={
        "description":weather.data.list[i].weather[0].description,
        "temp":Math.ceil(weather.data.list[i].main.temp),
        "temp_min":Math.floor(weather.data.list[i].main.temp_min),
        "temp_max":Math.ceil(weather.data.list[i].main.temp_max),
        "Humedity":weather.data.list[i].main.humidity,
        "Pressure":weather.data.list[i].main.pressure,
        "time":weather.data.list[i].dt_txt.substring(11,16),
        "image":imgSrc
      }
    }
    
    setWeatherData(dataSet);
  }
  else{
    setIsValid(false);
  }
}
  function changeCity(c){
    city.current=c;
    fetchWeather();
  }
  
  return (
    <GlobalContext.Provider value={{weatherData,changeCity}}>
    <div className="app ">

      <header className="app__header">
        <div className='nav'>
          <NavBar />
        </div>
      </header>

      <main className="app__main d-flex justify-content-center align-items-center">
        {isValid?
        weatherData[0].description?
        <CurrentWeather  />
      :
      null
    :
    <div className='text-center text-light h3 font-weight-bold'>Check city name ...</div>
    }
        
      </main>

    </div>
    </GlobalContext.Provider>
  );
}


export default App;
