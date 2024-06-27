import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsernameHandleService {
  private username = new BehaviorSubject<String>(`${sessionStorage.getItem('username')}`);
  current = this.username.asObservable();
  constructor() { }
}
