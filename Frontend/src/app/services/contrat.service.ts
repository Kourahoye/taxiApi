import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from '../interfaces/contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";
  token = sessionStorage.getItem('token')
  getContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.BASE_URL}/contrat/`,);
  }

  addContrat(data: Contrat): Observable<Contrat> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    return this.http.post<Contrat>(`${this.BASE_URL}/contrat/`, data,)
  }

  delContrat(id_Contrat: number): Observable<Contrat> {
    return this.http.delete<Contrat>(`${this.BASE_URL}/contrat/${id_Contrat}/`
    )
  }

  updateContrat(id_Contrat: number, data: Contrat): Observable<Contrat> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    return this.http.put<Contrat>(`${this.BASE_URL}/contrat/${id_Contrat}/`, data,)
  }

  getSingleContrat(id_Contrat: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.BASE_URL}/contrat/${id_Contrat}/`)
  }
  getChauffeurContrats(id_Contrat: number): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.BASE_URL}/contrat/chauffeur/${id_Contrat}/`)
  }

}
