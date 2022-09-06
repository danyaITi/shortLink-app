import {useContext} from "react";
import {Context} from "../index";
import $api from "../api";
import {AuthResp} from "../models/authResp";

export const useAuth = () => {

    const {store} = useContext(Context)

    const login = async (username:string, password:string) => {
        const resp = await $api.post<AuthResp>('/login?', `username=${username}&password=${password}`)
        setToken(resp.data.access_token)
        store.setAuth(true);
    }

    const logout = () => {
        localStorage.removeItem('token')
        store.setAuth(false)
    }

    const registration = async (username:string, password:string) => {
        await $api.post<AuthResp>(`/register?username=${username}&password=${password}`)
    }

    const isAuth = () => {
        return !!localStorage.getItem('token')
    }

    const init = () => {
        if (isAuth()) {
            store.setAuth(true)
        }
    }

    const setToken = (token: string) => localStorage.setItem('token', token);

    return {
        login,
        logout,
        isAuth,
        init,
        registration
    }
}
