import axios from "axios";
import { AuthResp } from "../models/authResp";

export const API_URL = 'http://79.143.31.216'

const $api = axios.create({
    baseURL:API_URL
})

$api.interceptors.request.use((config:any)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResp>(`${API_URL}/refresh`,{withCredentials: true})
            localStorage.setItem('token', response.data.access_token);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Вы не авторизованы')
        }
    }
    throw error;
})

export default $api