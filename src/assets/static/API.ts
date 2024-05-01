export class API {
    static ORIGIN: string = "https://r1dq4k84-7246.inc1.devtunnels.ms"
    static LOGIN: string = this.ORIGIN + '/api/user/login'
    static SEND_OTP: string = this.ORIGIN + '/api/otp/send'
    static VERIFY_OTP: string = this.ORIGIN + '/api/otp/verify'
    static CHANGE_PASSWORD: string = this.ORIGIN + '/api/user/password/change'
    static REFRESH_TOKEN: string = this.ORIGIN + '/api/token/refresh'
    static GET_USER: string = this.ORIGIN + '/api/user'
}