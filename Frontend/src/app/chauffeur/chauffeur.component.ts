import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Contrat } from '../interfaces/contrat';
import { ContratService } from '../services/contrat.service';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent {

  chauffeur : User ={
    modified_by_name: undefined,
    modified_at: undefined,
    created_by_name: undefined,
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
    modified_by: 0
  }
  contrats : Contrat []=[]

  constructor(private router: Router, private service: UserService,private contratService : ContratService){
    this.getUser()
    this.getContrat()
  }

  getUser(){
    const id = sessionStorage.getItem('id')
      this.service.getSingleUser(Number(id)).subscribe({
        next:(response)=>{
          //console.log(response)
          this.chauffeur = response
        },
        error:(error)=>console.log(error)
      })
  }
  getContrat(){
    const id = sessionStorage.getItem('id')
    this.contratService.getChauffeurContrats(Number(id)).subscribe({
      next:(response)=>{
        console.log(response)
        this.contrats = response
      },
      error:(error)=>console.log(error)
    })
  }
}
