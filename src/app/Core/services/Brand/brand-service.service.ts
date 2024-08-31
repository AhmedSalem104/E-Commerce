import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor(private _HttpClient : HttpClient) { }

  GetAllBrands():Observable<any>{
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/brands`)
  }
}
