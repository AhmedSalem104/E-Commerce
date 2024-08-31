import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enviroment } from '../../base/Envieroment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null
  private readonly _HttpClient = inject(HttpClient)

  private _Router = inject(Router)

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/signup`, data)
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/signin`, data)
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(JSON.stringify(localStorage.getItem('userToken')))
    }
  }

  logOut():void{

    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login'])

  }

  setEmailVerfiy(data: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }


  setCodeVerfiy(data: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }


  setResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${Enviroment.baseUrl}/api/v1/auth/resetPassword`, data)
  }



}


