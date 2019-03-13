import { Component, OnInit } from '@angular/core';
import { Hero } from '../modals/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }
  search(term:string): void{

  }
}
