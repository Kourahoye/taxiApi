import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotoService } from '../services/moto.service';
import { Moto } from '../interfaces/moto';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.css']
})
export class MotoComponent {
  title = 'COURS';
  actionOnGoing = "Creation"
  creationMode:boolean = true
  displayError:string|undefined
  motos: Moto[] = [];
  searchForm:FormGroup;
  myForm:FormGroup;
  etudiants:any;
  displaySucess: any|undefined;
  moto_en_cours: Moto = {
    id: 0,
    numero_serie: 0,
    couleur: "",
    date_achat: "",
    created_at: "",
    modified_at: "",
    created_by: 0,
    modified_by: 0,
    modified_by_name: undefined,
    created_by_name: undefined
  }

  constructor(private service:MotoService, private fb:FormBuilder){
    this.myForm = this.fb.group({
      numero_serie: ['',Validators.required],
      couleur:['',Validators.required],
      date_achat:['',Validators.required],
    })
    this.searchForm = this.fb.group({

    })
    this.getMotos();
    this.creationMode = true
    this.actionOnGoing = "Creation"
    this.displayError=""
    this.displaySucess=""
  }
  update(moto:Moto){
    this.creationMode = false
    this.actionOnGoing = "Modification"
    this.displayError = ""
    this.displaySucess=""
    this.moto_en_cours = moto
  }

  getMotos(){
    this.service.getMoto().subscribe({
      next:(response)=>{
        console.log(response)
        this.motos = response
      },
      error:(error)=>console.log(error)
    })
  }

  deleteMoto(id:number){
    this.service.delMoto(id).subscribe({
      next:(response)=>{
          this.myForm.reset()
          this.getMotos()
          this.creationMode = true
          this.actionOnGoing = "Creation"
          this.displaySucess = "Moto supprimée"
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
        this.service.addMoto(this.myForm.value).subscribe({
          next:(response)=>{
            this.myForm.reset()
            this.getMotos()
            this.displaySucess = "Enregistrement effectuer"
            this.displayError = ""
          },
          error:(error)=>{
            console.error(error)
            this.displayError  =  error.error.numero_serie
            this.displaySucess = ""
          }
        })

      }
    }else{
      this.service.updateMoto(this.moto_en_cours.id,this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getMotos()
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
