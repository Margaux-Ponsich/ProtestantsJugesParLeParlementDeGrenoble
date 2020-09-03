import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProtestantService} from "../../services/protestant.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public router: Router, public protestantService: ProtestantService) { }

  ngOnInit(): void {
  }

}
