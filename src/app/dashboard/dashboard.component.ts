import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../modals/hero';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data = {
    labels: ['BMW', 'Mazda', 'Audi'],
    datasets: [
      {
        data: [5, 3, 1],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }
    ]
  };
  heroes: Hero[];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.heroService.getHeroes().subscribe((heroes)=>{
    //   this.heroes = heroes.slice(1,5);
    // })
  }
}
