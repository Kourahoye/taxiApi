import { Injectable } from '@angular/core';
import { Entretien } from '../interfaces/entretien';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";
  token = sessionStorage.getItem('token')
  getEntretien(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.BASE_URL}/entretien/`,);
  }

  addEntretien(data: Entretien): Observable<Entretien> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    data.moto = Number(data.moto)
  //  console.log(data)
    return this.http.post<Entretien>(`${this.BASE_URL}/entretien/`, data,)
  }

  delEntretien(id_Entretien: number): Observable<Entretien> {
    return this.http.delete<Entretien>(`${this.BASE_URL}/entretien/${id_Entretien}/`
    )
  }

  updateEntretien(id_Entretien: number, data: Entretien): Observable<Entretien> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    return this.http.put<Entretien>(`${this.BASE_URL}/entretien/${id_Entretien}/`, data,)
  }

  getSingleEntretien(id_Entretien: number): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.BASE_URL}/entretien/${id_Entretien}/`)
  }

}
