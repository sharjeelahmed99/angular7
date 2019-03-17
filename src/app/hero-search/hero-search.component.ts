import { Component, OnInit } from '@angular/core';
import { Hero } from '../modals/hero';
import { HeroService } from '../services/hero.service';
import { Subject, Observable } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  private searchTerm =new Subject<string>();
  heroes: Hero[];
  ngOnInit() {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> this.heroService.search(term).pipe(
        tap((res)=> console.log(res) )
      )),
      
    ).subscribe((res)=>this.heroes =res)
  }
  search(term:string): void{
this.searchTerm.next(term);
  }
}
