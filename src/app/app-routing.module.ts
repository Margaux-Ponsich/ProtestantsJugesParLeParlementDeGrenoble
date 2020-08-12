import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from "./components/accueil/accueil.component";
import {BaseDeDonneesComponent} from "./components/base-de-donnees/base-de-donnees.component";
import {AffairePageComponent} from "./components/affaire-page/affaire-page.component";


const routes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'baseDeDonnee', component: BaseDeDonneesComponent},
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'baseDeDonnee/:id', component: AffairePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
