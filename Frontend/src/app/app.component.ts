import { Component, SimpleChanges } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private auth:UserService, private route:Router){

}
logout(){
  this.auth.logout()
  this.route.navigate(['/login'])
}

  title = 'TaxiApi';
}
