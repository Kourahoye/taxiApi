import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  utilisateurs:User[]=[]
  utilisateur_en_cours:User = {
    id: 0,
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    addresse: '',
    telephone: '',
    type_utlisateur: '',
    date_embauche: '',
    created_by: 0,
    modified_by: 0,
    modified_by_name: undefined,
    modified_at: undefined,
    created_by_name: undefined
  }
  sign_up_form: FormGroup
  user!: User;
  errors: string
  success: string
type_user: any;
  constructor(private router: Router, private service: UserService, private fb: FormBuilder) {
    this.sign_up_form = this.fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.required],
      "first_name": ["", Validators.required],
      "last_name": ["", Validators.required],
      "addresse": ["", Validators.required],
      "telephone": ["", Validators.required],
      "type_utlisateur": ["",Validators.required],
      "date_embauche": ["",Validators.required],
    })
    this.errors = ""
    this.success = ""
    this.type_user = sessionStorage.getItem('type')
    this.getutilisateurs()
  }
  getutilisateurs(){
    this.service.getUser().subscribe({
      next:(response)=>{
        //console.log(response)
        this.utilisateurs = response
      },
      error:(error)=>console.log(error)
    })
  }
  update(user:User){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.success=""
    this.utilisateur_en_cours = user
  }
  deleteUser(id:number){
    this.service.delUser(id).subscribe({
      next:(response)=>{
          this.sign_up_form.reset()
          this.getutilisateurs()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.success = "User supprimée"
          this.displayError = ""
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  signUP() {
    if (this.creationMode){
    this.service.addUser(this.sign_up_form.value).subscribe({
      next: (response) => {
        //console.log(response)
        this.sign_up_form.reset
        this.success = "Creation reuissi"
        this.router.navigate(['login'])
      },
      error: (error) => {
        console.log(error)
        this.errors = error.error.username
      }
    })
  }else{
    this.service.updateUser(this.utilisateur_en_cours.id,this.sign_up_form.value).subscribe({
      next:(response)=>{
        this.sign_up_form.reset()
        this.getutilisateurs()
        this.creationMode = true
        this.actionOnGoing = "Creation"
        this.success = "Modification effectuer"
        this.displayError = ""
      },
      error:(error)=>console.error(error)
    })
  }
  this.displayError = ""
  this.success=""
  }
}

