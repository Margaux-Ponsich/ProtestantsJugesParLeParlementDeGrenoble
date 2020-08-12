import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CsvReaderService} from "../../services/csv-reader.service";
import {Protestant} from "../../country";

@Component({
  selector: 'app-affaire-page',
  templateUrl: './affaire-page.component.html',
  styleUrls: ['./affaire-page.component.css']
})
export class AffairePageComponent implements OnInit {

  constructor( private router: Router,  private route: ActivatedRoute, private csvReaderService: CsvReaderService) { }

  id ='';
  relatedRecords = [];

  ngOnInit(): void {
    if(this.csvReaderService.records != undefined) {
      this.getAffaire();
    } else {
      this.router.navigate(["/baseDeDonnee"]);
    }
  }

  getAffaire(): void {
    this.relatedRecords = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.relatedRecords = this.csvReaderService.records.filter(record => record.numero==this.id);
  }

  display(record: Protestant){
    return record.prenom + " " + record.nom + " " + record.sexe;
  }

}
