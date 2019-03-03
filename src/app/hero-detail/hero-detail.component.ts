import { Component, OnInit , Input} from '@angular/core';
import {Hero} from '../modals/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

 hero:Hero
  constructor(  private route: ActivatedRoute,  private location: Location,private heroService: HeroService) { }

  ngOnInit() {
    const id =+this.route.snapshot.paramMap.get('id');
    this.getHero(id);
  }
getHero(id: number): void {
  this.heroService.getHero(id).subscribe((hero)=>{
  this.hero=hero;
  })
}
goBack(): void {
  this.location.back();
}
save(){
  this.heroService.update(this.hero).subscribe(hero=>{
    this.goBack();
  })
}
}