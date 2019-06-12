import { Make } from './../../modals/make';
import { Component, OnInit } from '@angular/core';
import { Vehical } from '../../modals/vehical';
import { VehicalService } from '../../services/vehical.service';
import { Filter } from '../../modals/filter';
import { Model } from '../../modals/model';

@Component({
  selector: 'app-vehical-list',
  templateUrl: './vehical-list.component.html',
  styleUrls: ['./vehical-list.component.css']
})
export class VehicalListComponent implements OnInit {
  vehicals: Vehical[];

  filter: Filter;
  makes: Make[];
  models: Model[];
  constructor(private vehicalService: VehicalService) {
    this.filter = new Filter();
  }

  ngOnInit() {
    this.populatingVehicles();
    this.vehicalService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
    this.vehicalService.getModels().subscribe(models => {
      this.models = models;
    });
  }
  populatingVehicles() {
    this.vehicalService.getAll(this.filter).subscribe(vehicals => {
      this.vehicals = vehicals;
    });
  }
  onFilterChange() {
    this.populatingVehicles();
  }
  resetFilter() {
    this.filter = new Filter();
    this.populatingVehicles();
  }
}
