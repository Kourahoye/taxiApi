import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panne } from '../interfaces/panne';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PanneService {
  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";
  token = sessionStorage.getItem('token')
  getPanne(): Observable<Panne[]> {
    return this.http.get<Panne[]>(`${this.BASE_URL}/panne/`,);
  }

  addPanne(data: Panne): Observable<Panne> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    data.moto = Number(data.moto)
  //  console.log(data)
    return this.http.post<Panne>(`${this.BASE_URL}/panne/`, data,)
  }

  delPanne(id_Panne: number): Observable<Panne> {
    return this.http.delete<Panne>(`${this.BASE_URL}/panne/${id_Panne}/`
    )
  }

  updatePanne(id_Panne: number, data: Panne): Observable<Panne> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    return this.http.put<Panne>(`${this.BASE_URL}/panne/${id_Panne}/`, data,)
  }

  getSinglePanne(id_Panne: number): Observable<Panne> {
    return this.http.get<Panne>(`${this.BASE_URL}/panne/${id_Panne}/`)
  }

}
