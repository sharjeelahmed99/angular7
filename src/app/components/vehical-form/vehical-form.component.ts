import { ActivatedRoute } from '@angular/router';
import { Feature } from './../../modals/feature';
import { Component, OnInit } from '@angular/core';
import { VehicalService } from '../../services/vehical.service';
import { Make } from '../../modals/make';
import { Model } from '../../modals/model';
import { Vehical } from '../../modals/vehical';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-vehical-form',
  templateUrl: './vehical-form.component.html',
  styleUrls: ['./vehical-form.component.css']
})
export class VehicalFormComponent implements OnInit {
  makes: Make[];
  models: Model[];
  features: Feature[];
  vehical: Vehical;
  selectedMake: number;
  constructor(private vehicalService: VehicalService, private route: ActivatedRoute, private router: Route) {
    // route.params.subscribe(p => {
    //   this.vehical.Id = p['id'];
    // });
  }

  ngOnInit() {
    this.vehical = new Vehical();
    debugger;
    // if (this.vehical.Id) {
    // }
    this.vehicalService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
    this.vehicalService.getFeatures().subscribe(features => {
      this.features = features;
    });
  }
  onMakeChange() {
    this.models = this.makes.find(item => item.id == this.selectedMake).models;
    delete this.vehical.ModelId;
  }
  onToggleFeature(featureId, $event) {
    if ($event.target.checked) {
      this.vehical.Features.push(featureId);
    } else {
      let index = this.vehical.Features.indexOf(featureId);
      this.vehical.Features.splice(index, 1);
    }
  }
  onSubmit() {
    this.vehicalService.create(this.vehical).subscribe(data => {
      console.log(data);
    });
  }
}
