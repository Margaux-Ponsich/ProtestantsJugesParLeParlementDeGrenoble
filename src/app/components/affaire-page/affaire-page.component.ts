import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CsvReaderService} from "../../services/csv-reader.service";
import {Country} from "../../country";

@Component({
  selector: 'app-affaire-page',
  templateUrl: './affaire-page.component.html',
  styleUrls: ['./affaire-page.component.css']
})
export class AffairePageComponent implements OnInit {

  constructor( private router: Router,  private route: ActivatedRoute, private csvReaderService: CsvReaderService) { }

  id ='';
  relatedRecords: Country[] = [];

  ngOnInit(): void {
    if(this.csvReaderService.records != undefined) {
      this.getAffaire();
    } else {
      this.router.navigate(["/baseDeDonnees"]);
    }
  }

  getAffaire(): void {
    this.relatedRecords = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.relatedRecords = this.csvReaderService.records.filter(record => record.Numerodelaffaire==this.id);
  }

  display(record: Country){
    return record.Prenom + " " + record.Nom + " " + record.Sexe;
  }

}
