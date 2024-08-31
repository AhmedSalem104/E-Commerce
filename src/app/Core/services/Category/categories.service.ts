import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/Envieroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient)


  getAllGategories(): Observable<any> {
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/categories`)
  }
  getSpecificGategories(id:string): Observable<any> {
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/categories/${id}`)
  }
}
