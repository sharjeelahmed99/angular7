import { Make } from './../../modals/make';
import { Component, OnInit } from '@angular/core';
import { Vehical } from '../../modals/vehical';
import { VehicalService } from '../../services/vehical.service';

@Component({
  selector: 'app-vehical-list',
  templateUrl: './vehical-list.component.html',
  styleUrls: ['./vehical-list.component.css']
})
export class VehicalListComponent implements OnInit {
  vehicals: Vehical[];
  allVehicals: Vehical[];
  filter: any = {};
  makes: Make[];
  constructor(private vehicalService: VehicalService) {}

  ngOnInit() {
    this.vehicalService.getAll().subscribe(vehicals => {
      this.vehicals = this.allVehicals = vehicals;
    });
    this.vehicalService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }
  onFilterChange() {
    debugger;
    let vehicles = this.allVehicals;
    if (this.filter.makeId) {
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    }

    this.vehicals = vehicles;
  }
}
