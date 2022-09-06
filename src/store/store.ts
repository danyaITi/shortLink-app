import { makeAutoObservable } from "mobx"

export default class Store {
    isAuth = false

    constructor(){
        makeAutoObservable(this)
    }

    setAuth(arg:boolean){
        this.isAuth = arg
    }

}
