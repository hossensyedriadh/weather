import axios from 'axios';

const KEY = '8697ebb88ed442a28962efd62c1f2b63';

export default axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1',
    params: {
        key: KEY
    }
});