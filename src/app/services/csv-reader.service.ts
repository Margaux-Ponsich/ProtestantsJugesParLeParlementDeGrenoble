import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country} from "../country";

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {

  records: Country[];

  constructor( private http: HttpClient) {
    this.http.get('assets/newDB.csv', {responseType: 'text'})
      .subscribe(data => {
        let csvRecordsArray = (<string>data).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      });
  // this.records = [];
  }

getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): Country[]{
  let csvArr = [];

  for (let i = 1; i < csvRecordsArray.length; i++) {
    let curruntRecord = (<string>csvRecordsArray[i]).split('$');
    if (curruntRecord.length >= headerLength) {
      let csvRecord: Country = new Country();

      csvRecord.Numerodelaffaire = curruntRecord[0].trim();
      csvRecord.Momentdelaffaire = curruntRecord[1].trim();
      csvRecord.Nom = curruntRecord[2].trim();
      csvRecord.Prenom = curruntRecord[3].trim();
      csvRecord.Sexe = curruntRecord[4].trim();
      csvRecord.Indicationfamiliale = curruntRecord[5].trim();
      csvRecord.Metier = curruntRecord[6].trim();
      csvRecord.Lieudevie = curruntRecord[7].trim();
      csvRecord.Raisondelarrestation = curruntRecord[8].trim();
      csvRecord.Localisationduverbal = curruntRecord[9].trim();
      csvRecord.Datedarrestationdateduverbal = curruntRecord[10].trim();
      csvRecord.Quilaarreteredigeleverbal = curruntRecord[11].trim();
      csvRecord.Lieudarrestation = curruntRecord[12].trim();
      csvRecord.renseignementdansleverbal = curruntRecord[13].trim();
      csvRecord.Presentedanslaprisons = curruntRecord[14].trim();
      csvRecord.RENSEIGNMENTECROUX = curruntRecord[15].trim();
      csvRecord.ADJURATION = curruntRecord[16].trim();
      csvRecord.Registredarretoubrouillard = curruntRecord[17].trim();
      csvRecord.Datedelarret = curruntRecord[18].trim();
      csvRecord.Sentence = curruntRecord[19].trim();
      csvRecord.Ajoutinformationautrebasededonnecommecelledesgaleriens = curruntRecord[20].trim();
      csvRecord.Registrecomplet = curruntRecord[21].trim();
      csvRecord.dateduregistre = curruntRecord[22].trim();
      csvRecord.Surquoiportelarret = curruntRecord[23].trim();
      csvRecord.Detailutilise = curruntRecord[24].trim();
      csvRecord.Registrederemission = curruntRecord[25].trim();
      csvRecord.Date = curruntRecord[26].trim();
      csvRecord.Endroitdouviennentlespiece = curruntRecord[27].trim();
      csvRecord.Informationsupplementaire = curruntRecord[28].trim();
      csvRecord.LocalisationDuRegistre = curruntRecord[29].trim();
      csvRecord.Registredecommisaire = curruntRecord[30].trim();
      csvRecord.LocalisationDeuxiemeMention = curruntRecord[31].trim();
      csvRecord.DeuxiemeMentionRegistreDistrib = curruntRecord[32].trim();

      if(csvRecord.Momentdelaffaire.includes("dossier de procédure")){
        csvRecord.DateToDisplay = csvRecord.Datedarrestationdateduverbal;
      }else {
        csvRecord.DateToDisplay = csvRecord.Datedelarret;
      }
      if(csvRecord.DateToDisplay === undefined || csvRecord.DateToDisplay === null || csvRecord.DateToDisplay.length === 0 ){
        csvRecord.DateToDisplay = csvRecord.dateduregistre;
      }
      console.log(csvRecord.Sexe);
      csvArr.push(csvRecord);
    } else {
      console.log(curruntRecord.length);
    }
  }
  return csvArr;
}

getHeaderArray(csvRecordsArr: any) {
  let headers = (<string>csvRecordsArr[0]).split('$');
  let headerArray = [];
  for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
  }
  return headerArray;
}
}
