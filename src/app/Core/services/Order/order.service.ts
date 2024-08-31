import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient) { }

  CheckoutCreadit(cart_Id: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/orders/checkout-session/${cart_Id}?url=${Enviroment.UrlServer}`,
      {
        "shippingAddress": shippingDetails
      },
     

    )

  }
  CheckoutCash(cart_Id: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/orders/${cart_Id}`,

      {
        "shippingAddress": shippingDetails
      },
     

    )

  }
  getUserorders(User_Id: string): Observable<any> {
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/orders/user/${User_Id}`,
    )
  }
  decodeToken(): any {

    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);

    return this.userData.getValue()




  }
}
