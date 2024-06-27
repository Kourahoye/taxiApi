import { Component } from '@angular/core';
import { Contrat } from '../interfaces/contrat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moto } from '../interfaces/moto';
import { ContratService } from '../services/contrat.service';
import { MotoService } from '../services/moto.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  contrats:Contrat[] = [];
  motos:Moto[] =[]
  chauffeurs:User[]=[]
  searchForm:FormGroup;
  myForm:FormGroup;
  etudiants:any;
  displaySucess: any|undefined;
  contrat_en_cours:Contrat = {
    id: 0,
    created_at: "",
    modified_at: "",
    created_by: 0,
    modified_by: 0,
    moto: 0,
    etat: '',
    modified_by_name: undefined,
    created_by_name: undefined,
    chauffeur: 0,
    montant_initial: '',
    montant_journalier: '',
    date_debut: '',
    date_fin: '',
    chauffeur_username: undefined,
    moto_numero_serie: undefined,
    type_contrat: undefined
  }

  constructor(private service:ContratService, private fb:FormBuilder,private motoService:MotoService,private userService:UserService){
    this.myForm = this.fb.group({
      moto: ['',Validators.required],
      etat:['',Validators.required],
      date_debut: ['',Validators.required],
      date_fin: ['',Validators.required],
      chauffeur : ['',Validators.required],
      montant_initial: ['',Validators.required],
      montant_journalier: ['',Validators.required],
      type_contrat: ['',Validators.required],
    })
    this.searchForm = this.fb.group({

    })
    this.getMotos()
    this.getContrats();
    this.getChauffeurs();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(contrat:Contrat){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.contrat_en_cours = contrat
  }

  getContrats(){
    this.service.getContrat().subscribe({
      next:(response)=>{
        //console.log(response)
        this.contrats = response
      },
      error:(error)=>console.log(error)
    })
  }
  getMotos(){
    this.motoService.getMoto().subscribe({
      next:(response)=>{
        //console.log(response)
        this.motos = response
      },
      error:(error)=>console.log(error)
    })
  }
  getChauffeurs(){
    this.userService.getUser().subscribe({
      next:(response)=>{
        //console.log(response)
        this.chauffeurs = response
      },
      error:(error)=>console.log(error)
    })
  }

  deleteContrat(id:number){
    this.service.delContrat(id).subscribe({
      next:(response)=>{
          this.myForm.reset()
          this.getContrats()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Contrat supprimée"
          this.displayError = ""
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  enregistrer(){
    if (this.creationMode){
      if(this.myForm.valid){
        this.service.addContrat(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getContrats()
            console.log(response)
            this.displaySucess = "Enregistrement effectuer"
            this.displayError = ""
          },
          error:(error)=>{
            console.error(error)
            this.displayError  =  error.error.error
            this.displaySucess = ""
          }
        })

      }
    }else{
      this.service.updateContrat(this.contrat_en_cours.id,this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getContrats()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Modification effectuer"
          this.displayError = ""
        },
        error:(error)=>console.error(error)
      })
    }
    this.displayError = ""
    this.displaySucess=""
  }


}
