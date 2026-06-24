import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api'

export const fetchOptions = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
};

export const apiClient = axios.create({
    baseURL: BASE_URL,
    ...fetchOptions
});

apiClient.interceptors.request.use((config) => {
    const lang = localStorage.getItem('app_lang') || 'en';
    config.headers['Accept-Language'] = lang;
    return config;
});
