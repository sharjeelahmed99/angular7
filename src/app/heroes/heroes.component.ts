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
//newHero:Hero;
  ngOnInit() {
  this.heroService.getHeroes().subscribe((heroes)=>{
    this.heroes= heroes;
  })
  }

  add(name:string){
    if(!name){
      return;
    }

    return this.heroService.add({name} as Hero).subscribe((newHero)=>{
      this.heroes.push(newHero);
    })
  }

  delete(hero :Hero){
    return this.heroService.delete(hero)
    .subscribe(()=>{
    this.heroService.getHeroes()
    .subscribe((heroes)=>{
    this.heroes=heroes
   })
    });
  }

  
}
