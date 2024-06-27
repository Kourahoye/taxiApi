import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moto } from '../interfaces/moto';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class MotoService {
  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";
  token = sessionStorage.getItem('token')
  getMoto(): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.BASE_URL}/motos/`,);
  }

  addMoto(data: Moto): Observable<Moto> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    return this.http.post<Moto>(`${this.BASE_URL}/motos/`, data,)
  }

  delMoto(id_Moto: number): Observable<Moto> {
    return this.http.delete<Moto>(`${this.BASE_URL}/motos/${id_Moto}/`
    )
  }

  updateMoto(id_Moto: number, data: Moto): Observable<Moto> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    return this.http.put<Moto>(`${this.BASE_URL}/motos/${id_Moto}/`, data,)
  }

  getSingleMoto(id_Moto: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.BASE_URL}/motos/${id_Moto}/`)
  }

}
