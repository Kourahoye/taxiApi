import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChauffeurComponent } from "./chauffeur/chauffeur.component";
import { ContratComponent } from "./contrat/contrat.component";
import { EntretienComponent } from "./entretien/entretien.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { JwtInterceptor } from "./interseptor";
import { MotoComponent } from "./moto/moto.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PanneComponent } from "./panne/panne.component";
import { RecetteComponent } from "./recette/recette.component";
import { UserService } from "./services/user.service";
import { LoginComponent } from "./users/login/login.component";
import { SignUpComponent } from "./users/sign-up/sign-up.component";
import { AppRoutingModule } from "./app-routing.module";
import { MotoService } from "./services/moto.service";
import { PanneService } from "./services/panne.service";
import { EntretienService } from "./services/entretien.service";
import { ContratService } from "./services/contrat.service";
import { RecetteService } from "./services/recette.service";
import { UsernameHandleService } from "./services/username-handle.service";
import { AuthInterceptor } from "./auth.interceptor";



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    SignUpComponent,
    MotoComponent,
    HomePageComponent,
    PanneComponent,
    HomePageComponent,
    EntretienComponent,
    ContratComponent,
    RecetteComponent,
    ChauffeurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    MotoService,
    PanneService,
    EntretienService,
    UsernameHandleService,
    AuthInterceptor,
    JwtInterceptor,
    ContratService,
    RecetteService,
    JwtInterceptor,
    UserService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
