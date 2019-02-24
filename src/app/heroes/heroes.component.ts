import { Component, OnInit } from '@angular/core';
import {Hero} from '../modals/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  constructor(private heroService: HeroService) {
  
   }

  ngOnInit() {
  this.heroService.getHeroes().subscribe((heroes)=>{
    this.heroes= heroes;
  })
  }

  
}
