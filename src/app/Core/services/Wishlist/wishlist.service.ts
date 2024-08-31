import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
 
  constructor(private _HttpClient: HttpClient) { }

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/wishlist`)
  }
  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/wishlist`,
      {
        "productId": productId
      }
      
    )
  }
  RemoveProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${Enviroment.baseUrl}/api/v1/wishlist/${productId}`    
    )
  }
}
