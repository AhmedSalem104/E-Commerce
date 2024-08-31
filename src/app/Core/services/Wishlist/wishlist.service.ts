import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';
import { WishListObj } from '../../interfaces/wishList/getLogedUserWishList';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishListCount :WritableSignal<number> = signal(0)
 
  constructor(private _HttpClient: HttpClient) { }

  GetLoggedUserWishlist(): Observable<WishListObj> {
    return this._HttpClient.get<WishListObj>(`${Enviroment.baseUrl}/api/v1/wishlist`)
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
