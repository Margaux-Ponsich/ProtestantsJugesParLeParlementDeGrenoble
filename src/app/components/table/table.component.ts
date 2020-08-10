import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ProtestantService} from "../../services/protestant.service";
import {Country} from '../../country';
import {NgbdSortableHeader, SortEvent} from '../../services/sortable.directive';
import {Observable} from "rxjs";
import {CsvReaderService} from "../../services/csv-reader.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: ProtestantService, public csvReaderService: CsvReaderService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
  }
}
