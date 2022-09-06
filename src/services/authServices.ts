import { AxiosResponse } from "axios";
import $api from "../api";
import { AuthResp } from "../models/authResp";

export default class AuthServices {
    static async registration (username:string, password:string): Promise<AxiosResponse<AuthResp>> {
        return $api.post<AuthResp>(`/register?username=${username}&password=${password}`)
    }

    static async login (username:string, password:string): Promise<AxiosResponse<AuthResp>> {
        return $api.post<AuthResp>('/login?', `username=${username}&password=${password}`)
    }
    static isAuth(){
        return !!localStorage.getItem('token')
    }

}

