import axios from "axios";
export const API_URL = 'http://79.143.31.216'

const $api = axios.create({
    baseURL:API_URL
})

$api.interceptors.request.use((config:any)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api
