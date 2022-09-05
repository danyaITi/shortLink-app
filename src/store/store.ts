import axios from "axios"
import { makeAutoObservable } from "mobx"
import { API_URL } from "../api"
import { AuthResp, IUser } from "../models/authResp"
import AuthServices from "../services/authServices"

export default class Store {
    user = {} as IUser
    isAuth = false
    isLogin = true
    
    constructor(){
        makeAutoObservable(this)
    }

    setAuth(arg:boolean){
        this.isAuth = arg
    }

    setLogin(arg:boolean){
        this.isLogin = arg
    }

    setUser(user:IUser){
        this.user = user
    }

    async registration(email:string, password:string){
        try {
            const resp = await AuthServices.registration(email,password)
            localStorage.setItem('token', resp.data.access_token)
            this.setAuth(true)
            this.setUser(resp.data.user)
        } catch (error) {
            alert(error)
        }
    }

    async login(email:string, password:string){
        try {
            const resp = await AuthServices.login(email,password)
            localStorage.setItem('token', resp.data.access_token)
            this.setAuth(true)
            this.setUser(resp.data.user)
        } catch (error) {
            alert(error)
        }
    }

    async logout(){
        try {
            const resp = await AuthServices.logout()
            localStorage.removeItem('token')
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error)
        } finally{
            this.setAuth(false)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResp>(`${API_URL}/refresh`,{withCredentials: true})
            localStorage.setItem('token', response.data.access_token);
            // this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        } 
    }

}