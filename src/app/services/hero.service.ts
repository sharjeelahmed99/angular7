import { Injectable } from '@angular/core';
import { Hero } from '../modals/hero';
import {  Heroes } from '../constants/mock-heros'
import { Observable, of } from 'rxjs';
import {MessageService} from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

 
  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('Hero data fetched');
    return of (Heroes);
  }
  getHero(id :number): Observable<Hero> {
    this.messageService.add('Hero with id'+id+ 'fetched');
    return of (Heroes.find(hero=> hero.id===id)); 
  }
}
