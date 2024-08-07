import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

constructor(){}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem("token")
      request = request.clone({
        setHeaders :{
          Authorization: `Bearer ${token}`
        }
      });
    return next.handle(request)
  }


}
