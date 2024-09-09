import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';
import { GetSpecificProduct } from '../../interfaces/Products/Products/GetSpecificProduct';
import { Products } from '../../interfaces/Products/Products/GetAllProducts';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(): Observable<Products> {
    return this._HttpClient.get<Products>(`${Enviroment.baseUrl}/api/v1/products`);
  }
  getAllProductsPagination(currentPage:number): Observable<Products> {
    return this._HttpClient.get<Products>(`${Enviroment.baseUrl}/api/v1/products?page=${currentPage}`);
  }
  getSpecificProduct(Id:string|null): Observable<GetSpecificProduct> {
    return this._HttpClient.get<GetSpecificProduct>(`${Enviroment.baseUrl}/api/v1/products/${Id}`);
  }


  
}
