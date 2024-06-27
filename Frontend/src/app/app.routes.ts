import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './users/login/login.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { MotoComponent } from './moto/moto.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { PanneComponent } from './panne/panne.component';
import { EntretienComponent } from './entretien/entretien.component';
import { RecetteComponent } from './recette/recette.component';
import { ContratComponent } from './contrat/contrat.component';
import { authchildGuard } from './guards/authchild.guard';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { authpermissionGuard } from './guards/authpermission.guard';
export const routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'dashbord', component: HomePageComponent, title: 'Home', children: [
      { path: 'panne', component: PanneComponent, title: 'Panne', canActivatechild: [authchildGuard, authpermissionGuard] },
      { path: 'chauffeur', component: ChauffeurComponent, title: 'Chauffeur', canActivatechild: [authchildGuard] },
      { path: 'moto', component: MotoComponent, title: 'Moto', canActivatechild: [authchildGuard, authpermissionGuard] },
      { path: 'signUp', component: SignUpComponent, title: 'Sign Up', canActivatechild: [authchildGuard, authpermissionGuard] },
      { path: 'entretien', component: EntretienComponent, title: 'Entretien', canActivatechild: [authchildGuard, authpermissionGuard] },
      { path: 'recettes', component: RecetteComponent, title: 'Recette', canActivatechild: [authchildGuard, authpermissionGuard] },
      { path: 'contrat', component: ContratComponent, title: 'Contrat', canActivatechild: [authchildGuard, authpermissionGuard] },
      // { path: '**', component: NotFoundComponent, title: '404 Not found' },
    ]
  },
  { path: '**', component: NotFoundComponent, title: '404 Not found' },
];
