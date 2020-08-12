import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TableComponent } from './components/table/table.component';
import {FormsModule} from "@angular/forms";
import {NgbdSortableHeader} from "./services/sortable.directive";
import {HttpClientModule} from "@angular/common/http";
import { AccueilComponent } from './components/accueil/accueil.component';
import { BaseDeDonneesComponent } from './components/base-de-donnees/base-de-donnees.component';
import { AffairePageComponent } from './components/affaire-page/affaire-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TableComponent,
    NgbdSortableHeader,
    AccueilComponent,
    BaseDeDonneesComponent,
    AffairePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
