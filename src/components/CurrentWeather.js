import React from "react";
import convert from 'convert-units';
import '../stylesheets/CurrentWeather.css';

const CurrentWeather = (props) => {
    if (!props.weather.temp) {
        return (
            <div className='ui segment' style={{height: '100%', width: '100%'}}>
                <div className='ui active inverted loader'>
                    <div className='ui large text loader'>Getting weather...</div>
                </div>
            </div>
            );
    }

    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <section className='ui segments' id='current_weather'>
            <div className='ui segment' id='weather_div'>
                <img src={`http://openweathermap.org/img/w/${props.weather.icon}.png`} alt={props.weather.weatherDesc}/>
                <p><strong>{props.weather.weatherMain}</strong></p>
                <p><strong>{props.weather.location}</strong></p>
                <p><strong>{`${day[new Date(props.weather.time*1000).getDay()]}, ${new Date(props.weather.time*1000).getDate()} ${month[new Date(props.weather.time*1000).getMonth()]}`}</strong></p>
                <p>Temperature: <strong>{Math.round(convert(props.weather.temp).from("K").to("C"))}&deg; C</strong></p>
                <p>Feels like: <strong>{Math.round(convert(props.weather.feelsLike).from("K").to("C"))}&deg; C</strong></p>
            </div>
            <div className='ui segment' id='solar_div'>
                <p>Sunrise: <strong>{new Date(props.weather.sunrise*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</strong></p>
                <p>Sunset: <strong>{new Date(props.weather.sunset*1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</strong></p>
            </div>
            <div className='ui segment' id='atmos_div'>
                <p>Pressure: <strong>{props.weather.pressure} hPa</strong></p>
                <p>Humidity: <strong>{props.weather.humidity}%</strong></p>
                <p>UV Index: <strong>{props.weather.uvi}</strong></p>
                <p>Clouds: <strong>{props.weather.clouds}%</strong></p>
                <p>Visibility: <strong>{props.weather.visibility} meters</strong></p>
            </div>
            <div className='ui segment' id='wind_div'>
                <p>Wind Velocity: <strong>{Math.round(convert(props.weather.windSpeed).from('m/s').to('km/h'))} km/h</strong></p>
                <p>Wind Direction: <strong>{props.weather.windDeg}&deg;</strong></p>
            </div>
        </section>
    );
};

export default CurrentWeather;