import { Component } from '@angular/core';
import { Recette } from '../interfaces/recette';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecetteService } from '../services/recette.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  recettes: Recette[] = [];
  chauffeurs:User[] =[]
  searchForm:FormGroup;
  myForm:FormGroup;
  displaySucess: any|undefined;
  recette_en_cours: Recette = {
    id: 0,
    created_at: "",
    modified_at: "",
    created_by: 0,
    modified_by: 0,
    chauffeur: 0,
    modified_by_name: undefined,
    created_by_name: undefined,
    date: '',
    montant: 0,
    chauffeur_username: ''
  }

  constructor(private service:RecetteService, private fb:FormBuilder,private userService:UserService){
    this.myForm = this.fb.group({
      chauffeur: ['',Validators.required],
      montant:['',Validators.required],
      date :['',Validators.required]
    })
    this.searchForm = this.fb.group({

    })
    this.getusers()
    this.getRecettes();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(Recette:Recette){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.recette_en_cours = Recette
  }

  getRecettes(){
    this.service.getRecette().subscribe({
      next:(response)=>{
        //console.log(response)
        this.recettes = response
      },
      error:(error)=>console.log(error)
    })
  }
  getusers(){
    this.userService.getChauffeur().subscribe({
      next:(response)=>{
        //console.log(response)
        this.chauffeurs = response
      },
      error:(error)=>console.log(error)
    })
  }

  deleteRecette(id:number){
    this.service.delRecette(id).subscribe({
      next:(response)=>{
          this.myForm.reset()
          this.getRecettes()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Recette supprimée"
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
        this.service.addRecette(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getRecettes()
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
      this.service.updateRecette(this.recette_en_cours.id,this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getRecettes()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Modification effectuer"
          this.displayError = ""
        },
        error:(error)=>{
          this.displayError = error.error.error
          console.error(error)
        },
      })
    }
    this.displayError = ""
    this.displaySucess = ""
  }


}
