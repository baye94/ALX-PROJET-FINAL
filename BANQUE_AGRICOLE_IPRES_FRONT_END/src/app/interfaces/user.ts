export interface IUser {
    Id:string,
    email: string,
    sub: string,
    jti: string,
    nbf: string,
    exp: string,
    iat: string,
}

export interface ISingleUser{
    data: IUser
}

export interface IDataUser{
    data: IUser[]
}

export interface ITokenUser{
    Id: string,
    email: string,
    sub: string,
    iat?: number,
    exp?: number,
    role:string[]
}
