import { Component } from '@angular/core';
import { Panne } from '../interfaces/panne';
import { PanneService } from '../services/panne.service';
import { Moto } from '../interfaces/moto';
import { MotoService } from '../services/moto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',
  styleUrls: ['./panne.component.css']
})
export class PanneComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  pannes: Panne[] = [];
  motos:Moto[] =[]
  searchForm:FormGroup;
  myForm:FormGroup;
  etudiants:any;
  displaySucess: any|undefined;
  panne_en_cours: Panne = {
    id: 0,
    created_at: "",
    modified_at: "",
    created_by: 0,
    modified_by: 0,
    moto: 0,
    description: '',
    etat: '',
    date_signalement: "",
    modified_by_name: undefined,
    created_by_name: undefined,
    moto_numero_serie: undefined
  }

  constructor(private service:PanneService, private fb:FormBuilder,private motoService:MotoService){
    this.myForm = this.fb.group({
      moto: ['',Validators.required],
      description:['',Validators.required],
      etat:['',Validators.required],
      date_signalement :['',Validators.required]
    })
    this.searchForm = this.fb.group({

    })
    this.getMotos()
    this.getpannes();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(panne:Panne){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.panne_en_cours = panne
  }

  getpannes(){
    this.service.getPanne().subscribe({
      next:(response)=>{
        //console.log(response)
        this.pannes = response
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

  deletepanne(id:number){
    this.service.delPanne(id).subscribe({
      next:(response)=>{
          this.myForm.reset()
          this.getpannes()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Panne supprimée"
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
        this.service.addPanne(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getpannes()
            this.displaySucess = "Enregistrement effectuer"
            this.displayError = ""
          },
          error:(error)=>{
            console.error(error)
            this.displayError  =  error.error
            this.displaySucess = ""
          }
        })

      }
    }else{
      this.service.updatePanne(this.panne_en_cours.id,this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getpannes()
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
