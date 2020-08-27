import axios from 'axios';

const KEY = 'f683e8465003bfccb7b50ea1b36f9782';

export default axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        exclude: 'minutely,hourly',
        appid: KEY
    }
});