import { makeAutoObservable } from "mobx"
import AuthServices from "../services/authServices"

export default class Store {
    isAuth = false

    constructor(){
        makeAutoObservable(this)
    }

    setAuth(arg:boolean){
        this.isAuth = arg
    }

    async login(email:string, password:string){
        const resp = await AuthServices.login(email,password)
        localStorage.setItem('token', resp.data.access_token)
        this.setAuth(true)
    }

    logout(){
        localStorage.removeItem('token')
        this.setAuth(false)
    }

    init() {
        const isAuth = localStorage.getItem('token')
        if(isAuth){
            this.setAuth(true)
        }
    }

}
