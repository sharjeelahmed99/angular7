import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Observable, of } from 'rxjs';
 import { catchError, map, tap } from 'rxjs/operators';
import { Make } from '../modals/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor( private http: HttpClient,) { }
  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>("/api/makes")
  }
  }