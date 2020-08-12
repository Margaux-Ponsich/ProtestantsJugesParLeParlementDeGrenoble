import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country, Protestant} from "../country";

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {

  records: Country[];

  constructor( private http: HttpClient) {
    this.http.get('assets/db.csv', {responseType: 'text'})
      .subscribe(data => {
        let csvRecordsArray = (<string>data).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      });
  }

getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  let csvArr = [];

  for (let i = 1; i < csvRecordsArray.length; i++) {
    let curruntRecord = (<string>csvRecordsArray[i]).split(',');
    if (curruntRecord.length >= headerLength) {
      let csvRecord: Protestant = new Protestant();
      csvRecord.numero = curruntRecord[0].trim();
      csvRecord.nom = curruntRecord[2].trim();
      csvRecord.prenom = curruntRecord[3].trim();
      csvRecord.moment = curruntRecord[1].trim();
      csvRecord.metier = curruntRecord[6].trim();
      csvRecord.sexe = curruntRecord[4].trim();
      csvArr.push(csvRecord);
    }
  }
  return csvArr;
}

getHeaderArray(csvRecordsArr: any) {
  let headers = (<string>csvRecordsArr[0]).split(',');
  let headerArray = [];
  for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
  }
  return headerArray;
}
}
