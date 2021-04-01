import axios from 'axios';

export default axios.create({
    baseURL: 'https://randompuns-api.herokuapp.com'
});