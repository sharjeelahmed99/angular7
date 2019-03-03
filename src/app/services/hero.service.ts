import { Injectable } from '@angular/core';
import { Hero } from '../modals/hero';
import {  Heroes } from '../constants/mock-heros'
import { Observable, of } from 'rxjs';
import {MessageService} from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; 
  constructor(private messageService: MessageService, private http: HttpClient,) { }
  getHeroes(): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl) .pipe(
     tap(_=>this.log('Heroes Fetched')),
    catchError(this.handleError('getHeroes', []))
  );
  }
  getHero(id :number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(()=>{this.log(`Fetched Hero ${id}`)}),
      catchError(this.handleError<Hero>('getHero'))
    )
  }
  update(hero:Hero):Observable<Hero>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap(()=> this.log(`Hero with id ${hero.id} updated`)),
      catchError(this.handleError('Hero Update',hero))
    );
  }
  add(hero:Hero):Observable<Hero>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap((newHero)=> this.log(`Hero with id ${newHero.id} added`)),
      catchError(this.handleError('Hero added',hero))
    );
  }

  delete(hero:Hero):Observable<Hero>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`,httpOptions).pipe(
      tap(()=> this.log(`Hero with id ${hero.id} deleted`)),
      catchError(this.handleError('Hero deleted',hero))
    );
  }
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}
