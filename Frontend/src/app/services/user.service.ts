import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, tap } from 'rxjs'
import { Userlogin } from '../interfaces/userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getChauffeur(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users/allChauffeurs/`)
  }

  private token: any;


  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:8000";

  login(data: Userlogin): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/users/login/`, data).pipe(
      tap(response => {
        this.token = response.token;
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('id', response.user.id)
        sessionStorage.setItem('username', response.user.username)
        sessionStorage.setItem('type', response.user.type_utlisateur)
      })
    )
  }
  logout() {
    this.token = null
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('type')
    this.http.get(`${this.BASE_URL}/users/refresh/`)
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users/`)
  }

  addUser(data: User): Observable<User> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    return this.http.post<User>(`${this.BASE_URL}/users/`, data)
  }

  delUser(id_User: number): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/users/${id_User}/`)
  }

  updateUser(id_User: number, data: User): Observable<User> {
    const user_id = sessionStorage.getItem('id')
    data.modified_by = Number(user_id)
    data.created_by = Number(user_id)
    return this.http.put<User>(`${this.BASE_URL}/users/${id_User}/`, data)
  }
  getFreeUser():Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users/chauffeurs/`)
  }

  getSingleUser(id_User: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id_User}/`)
  }

}
