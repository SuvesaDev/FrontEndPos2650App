import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_HACIENDA_DOLLAR } = getEnvVariables();

const haciendaApi = axios.create({
    baseURL: VITE_API_HACIENDA_DOLLAR,
});

//TODO: INTERCEPTORES with token

export default haciendaApi;