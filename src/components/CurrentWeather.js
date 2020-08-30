import React from "react";
import convert from 'convert-units';
import '../stylesheets/CurrentWeather.css';

const CurrentWeather = (props) => {
    if (!props.weather.temp) {
        return (
            <div className='ui active inverted loader'>
                <div className='ui large text loader'>Getting weather...</div>
            </div>
        );
    }

    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <section className='ui container' id='main'>
            <div className='ui segments' id='current_weather'>
                <div className='ui segment' id='weather_div'>
                    <img  className="ui centered image" src={`http://openweathermap.org/img/w/${props.weather.icon}.png`}
                         alt={props.weather.weatherDesc} style={{width: "4.5rem"}}/>
                    <h3 class="mb-3"><strong>{props.weather.weatherMain}</strong></h3>
                    <div id="place_day" className="mb-3">
                        <span className="row mb-2"><img src={require("../images/pin.png")} alt="place" style={{width: "1.5rem"}}/><p
                            className="mt-1 ml-2"><strong>{props.weather.location}</strong></p></span>
                        <span className='row mb-2'><img src={require("../images/calendar.png")} alt="date" style={{width: "1.5rem"}}/><p
                            className="mt-1 ml-2"><strong>{`${day[new Date(props.weather.time * 1000).getDay()]}, 
                        ${new Date(props.weather.time * 1000).getDate()} ${month[new Date(props.weather.time * 1000).getMonth()]}`}
                            </strong></p></span>
                    </div>
                    <span className="row mb-2" id="temp"><img src={require("../images/temperature.png")} alt="temperature"
                                                              style={{width: '3rem'}}/><h4
                        className="mt-1 ml-1"><strong>{Math.round(convert(props.weather.temp).from("K").to("C"))}&deg; C</strong></h4></span>
                    <i><strong>Feels
                        like {Math.round(convert(props.weather.feelsLike).from("K").to("C"))}&deg; C</strong></i>
                </div>
                <div className='ui segment' id='solar_div'>
                <span className="row"><img src={require("../images/sunrise.png")} alt="sunrise" style={{width: '2.5rem'}}/><strong
                    className="mt-3 ml-2">
                    {new Date(props.weather.sunrise * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</strong></span>
                    <span className="row"><img src={require("../images/sunset.png")} alt="sunset" style={{width: '2.5rem'}}/><strong
                        className="mt-3 ml-2">
                    {new Date(props.weather.sunset * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</strong></span>
                </div>
                <div className='ui segment' id='atmos_div'>
                    <div id="atmos_1">
                    <span className="row"><img src={require("../images/pressure.png")} alt="pressure"
                                               style={{width: '2rem'}}/><strong
                        className="mt-1 ml-2">{props.weather.pressure} hPa</strong></span>
                        <span className="row"><img src={require("../images/humidity.png")} alt="humidity"
                                                   style={{width: '2rem'}}/><strong
                            className="mt-1 ml-2">{props.weather.humidity}%</strong></span>
                    </div>
                    <div id="atmos_2">
                    <span className="row"><img src={require("../images/uvi.png")} alt="uv_index" style={{width: '2rem'}}/><strong
                        className="mt-1 ml-2">{props.weather.uvi}</strong></span>
                        <span className="row"><img src={require("../images/cloud.png")} alt="clouds"
                                                   style={{width: '2rem'}}/><strong
                            className="mt-1 ml-2">{props.weather.clouds}%</strong></span>
                    </div>
                    <span id="atmos_3" className="row"><img src={require("../images/visibility.png")} alt="visibility"
                                                            style={{width: '2rem'}}/><strong
                        className="mt-1 ml-2">{props.weather.visibility} meters</strong></span>
                </div>
                <div className='ui segment' id='wind_div'>
                <span className="row"><img src={require("../images/speed.png")} alt="wind_velocity"
                                           style={{width: '2rem'}}/><strong
                    className="mt-1 ml-2">{Math.round(convert(props.weather.windSpeed).from('m/s').to('km/h'))} km/h</strong></span>
                    <span className="row"><img src={require("../images/compass.png")} alt="wind_direction"
                                               style={{width: '2rem'}}/><strong
                        className="mt-1 ml-2">{props.weather.windDeg}&deg;</strong></span>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;