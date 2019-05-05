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
  filter: any = {};
  makes: Make[];
  constructor(private vehicalService: VehicalService) {}

  ngOnInit() {
    this.vehicalService.getAll().subscribe(vehicals => {
      this.vehicals = vehicals;
    });
    this.vehicalService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }
  onFilterChange() {}
}
