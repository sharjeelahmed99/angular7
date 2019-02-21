import { Component, OnInit } from '@angular/core';
import {Hero} from '../modals/hero';
import { Heroes } from '../constants/mock-heros';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes=Heroes;

  constructor() {
  
   }

  ngOnInit() {
   
  }

}
