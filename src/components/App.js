import React from "react";
import openweathermap from "../apis/openweathermap";
import opencagedata from "../apis/opencagedata";
import Spinner from "./Spinner";
import CurrentWeather from "./CurrentWeather";

class App extends React.Component {
    state = {lat: null, lon: null, error: '', location: '', time: '', sunrise: null, sunset: null, temp: null, feelsLike: null, pressure: null,
        humidity: null, uvi: null, clouds: null, visibility: null, windSpeed: null, windDeg: null, weatherMain: '', weatherDesc: '', icon: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude, lon: position.coords.longitude}),
            (failure) => this.setState({error: failure.message})
        );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.lat !== prevState.lat) {
            this.callAPI();
        }
    }

    callAPI = () => {
        openweathermap.get('/onecall', {
            params: {
                lat: this.state.lat,
                lon: this.state.lon
            }
        }).then((response) => {
            this.setState({
                lat: response.data.lat,
                lon: response.data.lon,
                time: response.data.current.dt,
                sunrise: response.data.current.sunrise,
                sunset: response.data.current.sunset,
                temp: response.data.current.temp,
                feelsLike: response.data.current.feels_like,
                pressure: response.data.current.pressure,
                humidity: response.data.current.humidity,
                uvi: response.data.current.uvi,
                clouds: response.data.current.clouds,
                visibility: response.data.current.visibility,
                windSpeed: response.data.current.wind_speed,
                windDeg: response.data.current.wind_deg,
                weatherMain: response.data.current.weather[0].main,
                weatherDesc: response.data.current.weather[0].description,
                icon: response.data.current.weather[0].icon
            });
        });

        opencagedata.get('/json', {
            params: {
                q: `${this.state.lat},${this.state.lon}`
            }
        }).then((response) => {
            this.setState({
                location: `${response.data.results[0].components.suburb}, ${response.data.results[0].components.city}`
            })
        });
    };

    renderContent() {
        //setInterval(this.callAPI, 3600000); //update every 1 hour

        if (!this.state.lat || !this.state.lon) {
            if (this.state.error !== '') {
                return <p className='text-danger'>{this.state.error}</p>;
            }
            return <Spinner text='Please allow access to your location'/>;
        }

        return this.renderWeather();
    };

    renderWeather() {
        return (
            <div>
                <CurrentWeather weather={this.state}/>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    };
}

export default App;