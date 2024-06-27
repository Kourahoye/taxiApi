import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errors: string
  login_form: FormGroup
displaySucess: any;
displayError: any;

  constructor(private router: Router, private service: UserService, private fb: FormBuilder) {
    this.login_form = this.fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.required],
    })
    this.errors = ""
  }

  login_user() {
    this.service.login(this.login_form.value).subscribe({
      next: (response) => {
        // console.log(response)
        this.displaySucess = "Connexion reussi"
        this.router.navigate(['dashbord'])
      },
      error: (error) => {
        console.log(error)
        this.displayError = error.error.non_field_errors
      }
    })
  }
}
