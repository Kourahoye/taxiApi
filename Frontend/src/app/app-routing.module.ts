import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContratComponent } from "./contrat/contrat.component";
import { EntretienComponent } from "./entretien/entretien.component";
import { authGuard } from "./guards/auth.guard";
import { authchildGuard } from "./guards/authchild.guard";
import { HomePageComponent } from "./home-page/home-page.component";
import { MotoComponent } from "./moto/moto.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PanneComponent } from "./panne/panne.component";
import { RecetteComponent } from "./recette/recette.component";
import { LoginComponent } from "./users/login/login.component";
import { SignUpComponent } from "./users/sign-up/sign-up.component";


const routes: Routes =[
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'dashbord', component: HomePageComponent, title: 'Home', canActivate: [authGuard], children: [
      { path: 'panne', component: PanneComponent, title: 'Panne', canActivateChild: [authchildGuard] },
      { path: 'moto', component: MotoComponent, title: 'Moto', canActivateChild: [authchildGuard] },
      { path: 'signUp', component: SignUpComponent, title: 'Sign Up', canActivateChild: [authchildGuard] },
      { path: 'entretien', component: EntretienComponent, title: 'Entretien', canActivateChild: [authchildGuard] },
      { path: 'recettes', component: RecetteComponent, title: 'Recette', canActivateChild: [authchildGuard] },
      { path: 'contrat', component: ContratComponent, title: 'Contrat', canActivateChild: [authchildGuard] },
    ]
  },
  { path: '**', component: NotFoundComponent, title: '404 Not found' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
