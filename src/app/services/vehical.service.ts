import { Vehical } from './../modals/vehical';
import { Feature } from './../modals/feature';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Make } from '../modals/make';
import { Filter } from '../modals/filter';
import { Model } from '../modals/model';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {
  constructor(private http: HttpClient) {}
  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>('/api/make');
  }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>('/api/features');
  }
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/api/make/models');
  }
  create(vehical: Vehical) {
    return this.http.post('/api/vehical', vehical);
  }
  get(id: number): Observable<Vehical> {
    return this.http.get<Vehical>(`/api/vehical/${id}`);
  }
  update(vehical: Vehical) {
    return this.http.put(`/api/vehical/${vehical.id}`, vehical);
  }
  delete(id: number) {
    return this.http.delete(`/api/vehical/${id}`);
  }
  getAll(filter: Filter): Observable<Vehical[]> {
    return this.http.get<Vehical[]>('/api/vehical?' + this.getQueryString(filter));
  }
  getQueryString(filter: Filter) {
    let parts = [];
    for (let prop in filter) {
      let value = filter[prop];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(prop) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }
}
