export interface GetLoginRes {
    access_token: string,
    token_type: string,
    expires_in: number
}


export interface UserData {
    id: string,
    email: string,
    admin: boolean,
    email_verificado_em: null | boolean
}