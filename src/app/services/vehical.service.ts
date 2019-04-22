import { Vehical } from './../modals/vehical';
import { Feature } from './../modals/feature';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Make } from '../modals/make';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {
  constructor(private http: HttpClient) {}
  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>('/api/makes');
  }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>('/api/makes');
  }
  create(vehical: Vehical) {
    return this.http.post('/api/vehical', vehical);
  }
}