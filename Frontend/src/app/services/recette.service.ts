import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recette } from '../interfaces/recette';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";
  token = sessionStorage.getItem('token')
  getRecette(): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.BASE_URL}/recette/`,);
  }

  addRecette(data: Recette): Observable<Recette> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    data.chauffeur = Number(sessionStorage.getItem('id'))
    //  console.log(data)
    return this.http.post<Recette>(`${this.BASE_URL}/recette/`, data,)
  }

  delRecette(id_Recette: number): Observable<Recette> {
    return this.http.delete<Recette>(`${this.BASE_URL}/recette/${id_Recette}/`
    )
  }

  updateRecette(id_Recette: number, data: Recette): Observable<Recette> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    return this.http.put<Recette>(`${this.BASE_URL}/recette/${id_Recette}/`, data,)
  }

  getSingleRecette(id_Recette: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.BASE_URL}/recette/${id_Recette}/`)
  }

}
