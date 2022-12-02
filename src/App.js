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
  const [navColor,setNavColor]=useState('#5C3EFA')
  const [color,setColor]=useState('#57b1f2')
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
      let color1='', color2='';
      let imgSrc='';
      switch(true){
        case (id<300):
            imgSrc='./img/weather-icons/storm.png';
            color1='#ccc0bd'
            color2='#7a6f6b'
            break;
          case (id>=300 && id<500):
            imgSrc='./img/weather-icons/drizzle.png';
            color1='#9abfb9'
            color2='#5c8981'
            break;
          case (id>=500 && id<600):
            imgSrc='./img/weather-icons/rain.png';
            color1='#6d7884'
            color2='#526275'
            break;
          case (id>=600 && id<700):
            imgSrc='./img/weather-icons/snow.png';
            color1='#d5dee9'
            color2='#3d79c1'
            break;
          case (id>=700 && id<800):
            imgSrc='./img/weather-icons/fog.png';
            color1='#3ec6a9'
            color2='#318784'
            break;
          case (id===800):
            imgSrc='./img/weather-icons/clear.png';
            color1='#0067fd'
            color2='#0c77fa'
            break;
          case (id===801):
            imgSrc='./img/weather-icons/partlycloudy.png';
            color1='#3a84f1'
            color2='#5391ec'
            break;
          case (id>801 && id<805):
            imgSrc='./img/weather-icons/mostlycloudy.png';
            color1='#7691d1'
            color2='#5e78ba'
            break;
          default:
            imgSrc='./img/weather-icons/unknown.png';
            color1='#a8b9e4'
            color2='#97a2be'
            break; 
      }  
      if(i===0){
        setColor(color1);
        setNavColor(color2);
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

      <header className="app__header" style={{backgroundColor:navColor}}>
        <div className='nav'>
          <NavBar />
        </div>
      </header>

      <main className="app__main d-flex justify-content-center align-items-center" style={{backgroundColor:color}}>
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
