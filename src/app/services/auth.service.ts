import { Injectable } from '@angular/core';
import IUser from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_STORAGE_KEY : string = 'UserData'

  setToken(token : string, user : IUser){
    localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify({'token' : token, 'user' : user}))
  }

  getToken(){
    localStorage.getItem(this.TOKEN_STORAGE_KEY)
  }

  removeToken(){
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
  }

  isLoggedIn(){
    const userdata = localStorage.getItem(this.TOKEN_STORAGE_KEY); 
    if(userdata==null || userdata == ""){
      return false
    }
    const token = JSON.parse(userdata).token
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  }
}