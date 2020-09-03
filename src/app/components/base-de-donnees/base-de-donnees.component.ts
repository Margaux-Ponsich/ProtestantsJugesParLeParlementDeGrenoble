import { Component, OnInit } from '@angular/core';
import {ProtestantService} from "../../services/protestant.service";

@Component({
  selector: 'app-base-de-donnees',
  templateUrl: './base-de-donnees.component.html',
  styleUrls: ['./base-de-donnees.component.css']
})
export class BaseDeDonneesComponent implements OnInit {

  constructor(public  protestantService: ProtestantService) { }

  ngOnInit(): void {
    this.protestantService.doTheSearch()
  }

}
