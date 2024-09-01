import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { Enviroment } from '../../base/Envieroment';
import { Observable, BehaviorSubject } from 'rxjs';
import { cartObj } from '../../interfaces/Cart/addProductToCart';
import { GetcartObj } from '../../interfaces/Cart/GetLoggedUserCart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  CartCount: WritableSignal<number> = signal(0)

  constructor(private _HttpClient: HttpClient) {

    effect(() => {
      localStorage.setItem('cartCount', this.CartCount().toString())
    })
  }

  addProductToCart(Product_Id: string): Observable<cartObj> {
    return this._HttpClient.post<cartObj>(`${Enviroment.baseUrl}/api/v1/cart`,
      { productId: Product_Id },
    )
  }
  getLoggedUserCart(): Observable<GetcartObj> {
    return this._HttpClient.get<GetcartObj>(`${Enviroment.baseUrl}/api/v1/cart`,
    )
  }
  UpdateCartProductQuantity(Product_Id: string, count: string): Observable<GetcartObj> {
    return this._HttpClient.put<GetcartObj>(`${Enviroment.baseUrl}/api/v1/cart/${Product_Id}`, { count: count },
    )
  }
  RemoveSpecificCartItem(Product_Id: string): Observable<GetcartObj> {
    return this._HttpClient.delete<GetcartObj>(`${Enviroment.baseUrl}/api/v1/cart/${Product_Id}`,
    )
  }
  ClearUserCart(): Observable<GetcartObj> {
    return this._HttpClient.delete<GetcartObj>(`${Enviroment.baseUrl}/api/v1/cart`,
    )
  }
}
