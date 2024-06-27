import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './users/login/login.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { MotoComponent } from './moto/moto.component';
import { UserService } from './services/user.service';
import { HomePageComponent } from './home-page/home-page.component';
import { JwtInterceptor } from './interseptor';
import { PanneComponent } from './panne/panne.component';
import { routes } from './app.routes';
import { EntretienComponent } from './entretien/entretien.component';
import { ContratComponent } from './contrat/contrat.component';
import { RecetteComponent } from './recette/recette.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';


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
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    JwtInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
