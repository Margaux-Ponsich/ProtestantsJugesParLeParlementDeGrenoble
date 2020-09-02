import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Country} from '../country';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import {CsvReaderService} from "./csv-reader.service";

interface SearchResult {
  countries: Country[];
  total: number;
}

interface State {
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Country[], column: SortColumn, direction: string): Country[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Country, term: string) {
  return country.Nom.toLowerCase().includes(term.toLowerCase())
    ||country.Prenom.toLowerCase().includes(term.toLowerCase())
    ||country.Momentdelaffaire.toLowerCase().includes(term.toLowerCase())
    ||country.Sexe.toLowerCase().includes(term.toLowerCase())
    ||country.Metier.toLowerCase().includes(term.toLowerCase())
    || (""+country.Numerodelaffaire).includes(term)
}

@Injectable({providedIn: 'root'})
export class ProtestantService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Country[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private csvReaderService: CsvReaderService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get searchTerm() { return this._state.searchTerm; }

  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.csvReaderService.records, sortColumn, sortDirection);

    // 2. filter
    let total = 0;
    if (countries !== undefined && countries !== null) {
      countries = countries.filter(country => matches(country, searchTerm));
      total = countries.length;
    }

    return of({countries, total});
  }
}
