import { Component } from '@angular/core';
import { Entretien } from '../interfaces/entretien';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moto } from '../interfaces/moto';
import { EntretienService } from '../services/entretien.service';
import { MotoService } from '../services/moto.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  entretiens: Entretien[] = [];
  motos:Moto[] =[]
  searchForm:FormGroup;
  myForm:FormGroup;
  etudiants:any;
  displaySucess: any|undefined;
  entretien_en_cours: Entretien = {
    id: 0,
    created_at: "",
    modified_at: "",
    created_by: 0,
    modified_by: 0,
    moto: 0,
    modified_by_name: undefined,
    created_by_name: undefined,
    moto_numero_serie: undefined,
    date_entretien: '',
    type_entretien: ''
  }

  constructor(private service:EntretienService, private fb:FormBuilder,private motoService:MotoService){
    this.myForm = this.fb.group({
      moto: ['',Validators.required],
      type_entretien:['',Validators.required],
      date_entretien :['',Validators.required]
    })
    this.searchForm = this.fb.group({

    })
    this.getMotos()
    this.getEntretiens();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(Entretien:Entretien){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.entretien_en_cours = Entretien
  }

  getEntretiens(){
    this.service.getEntretien().subscribe({
      next:(response)=>{
        //console.log(response)
        this.entretiens = response
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

  deleteEntretien(id:number){
    this.service.delEntretien(id).subscribe({
      next:(response)=>{
          this.myForm.reset()
          this.getEntretiens()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Entretien supprimée"
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
        this.service.addEntretien(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getEntretiens()
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
      this.service.updateEntretien(this.entretien_en_cours.id,this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getEntretiens()
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
