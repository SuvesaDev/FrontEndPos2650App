import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { 
    VITE_API_URL_Local, 
    VITE_API_URL_DEV, 
    VITE_API_URL_Test,
    VITE_API_URL_PRD 
} = getEnvVariables();

const suvesaApi = axios.create({
    baseURL: VITE_API_URL_PRD,
});

const suvesaApiAuth = axios.create({
    baseURL: VITE_API_URL_PRD,
});

//TODO: INTERCEPTORES with token
suvesaApi.interceptors.request.use( config => {

    const auth = JSON.parse(localStorage.getItem('auth')) || null;
    config.headers = {
        ...config.headers,
        'Authorization' : `Bearer ${ ( auth !== null ) ? auth.token : ''}`
    }

    return config;
});


export {
    suvesaApi,
    suvesaApiAuth
};