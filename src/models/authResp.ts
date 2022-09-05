export interface IUser {
    username: string,
    isActivated: boolean,
    id:string
}

export interface IStatistics {
    counter: number,
    id: number,
    short:string,
    target:string
}

export interface AuthResp {
    access_token: string,
    refreshToken:string,
    user:IUser
}