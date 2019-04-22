import { Feature } from './../../modals/feature';
import { Component, OnInit } from '@angular/core';
import { VehicalService } from '../../services/vehical.service';
import { Make } from '../../modals/make';
import { Model } from '../../modals/model';
import { Vehical } from '../../modals/vehical';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehical-form',
  templateUrl: './vehical-form.component.html',
  styleUrls: ['./vehical-form.component.css']
})
export class VehicalFormComponent implements OnInit {
  constructor(private vehicalService: VehicalService, private toastyService: ToastyService) {}
  makes: Make[];
  models: Model[];
  features: Feature[];
  vehical: Vehical;
  selectedMake: number;

  ngOnInit() {
    this.vehical = new Vehical();
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
    this.vehicalService.create(this.vehical).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.toastyService.error({
          title: 'Error',
          msg: 'Oops, Something went wrong',
          showClose: true,
          timeout: 5000
        });
      }
    );
  }
}
