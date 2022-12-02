import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../Utils/GlobalContext";
import './CurrentWeather.css';

function CurrentWeather(props){
    const context=useContext(GlobalContext);
    useEffect(()=>{
        console.log(context.weatherData[0])
    })
    return(
        <div className="container">
            <div className="flex-column align-items-start">
                
                <div className="d-flex justify-content-center m-2">
                    <div >
                        <img className="currentImg" src={context.weatherData[0].image} alt="cloud" />
                        <div className="text-center text-light h4 font-weight-bold">
                           <strong>{context.weatherData[0].description}</strong> 
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center m-2">
                    <div className="tempreture">
                    <strong>Tempreture</strong>{` ${context.weatherData[0].temp_min}° to ${context.weatherData[0].temp_max}°C`}
                    </div>
                </div>
                <div className="row d-inline">
                    <div className="d-flex justify-content-center">
                    <span className="m-1">
                      <strong className="m-3">Humedity</strong> {` ${context.weatherData[0].Humedity}`} 
                    </span>
                    <span className="m-1">
                    <strong className="m-3">Pressure</strong>  {` ${context.weatherData[0].Pressure}`}
                    </span>
                    </div>
                </div>  
                                         
            </div>
                        
                   
                
            <div className="d-inline ">
                <ul className="d-flex justify-content-center align-items-center">
                    {context.weatherData.map((item,idx)=>{
                        return(
                            <li key={idx} className="d-flex flex-column align-items-center m-5"> 
                                {item.time}
                                    <img src={`${item.image}`} alt="wether icon" />
                                    {`${item.temp}°C`}
                            </li>
                        )
                    })}
                </ul>
            </div>
                
            
        </div>
    )
}
export default CurrentWeather;