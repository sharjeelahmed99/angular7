import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from './../../modals/feature';
import { Component, OnInit } from '@angular/core';
import { VehicalService } from '../../services/vehical.service';
import { Make } from '../../modals/make';
import { Model } from '../../modals/model';
import { Vehical } from '../../modals/vehical';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'underscore';
import { ToastyService } from 'ng2-toasty';
import { timeout } from 'q';

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
  constructor(
    private vehicalService: VehicalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) {
    this.vehical = new Vehical();
    route.params.subscribe(p => {
      this.vehical.id = p['id'];
    });
  }

  ngOnInit() {
    //TODO: use forkJoin
    // let sources = [this.vehicalService.getMakes(), this.vehicalService.getFeatures()];
    // if (this.vehical.Id) {
    //   sources.push(this.vehicalService.get(this.vehical.Id));
    // }
    // Observable.forkJoin(sources).subscribe(data => {
    //   this.makes = data[0];
    //   this.features = data[1];
    // });
    if (this.vehical.id) {
      this.vehicalService.get(this.vehical.id).subscribe(
        v => {
          //todo:temp fix
          setTimeout(() => {
            this.setVehical(v);
            this.fillModels();
          }, 300);
        },
        err => {
          if (err.status === 404) {
            this.toastyService.error({
              title: 'Error',
              msg: 'Vehicle not found',
              showClose: true,
              timeout: 5000
            });
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }

    this.vehicalService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
    this.vehicalService.getFeatures().subscribe(features => {
      this.features = features;
    });
  }
  setVehical(v: Vehical) {
    this.vehical.contact = v.contact;
    this.vehical.features = _.pluck(v.features, 'id');
    this.vehical.modelId = v.model.id;
    this.vehical.isRegistered = v.isRegistered;
    this.vehical.contact = v.contact;
    this.selectedMake = v.make.id;
  }

  onMakeChange() {
    this.fillModels();
    delete this.vehical.modelId;
  }
  private fillModels() {
    this.models = this.makes.find(item => item.id == this.selectedMake).models;
  }

  onToggleFeature(featureId, $event) {
    if ($event.target.checked) {
      this.vehical.features.push(featureId);
    } else {
      let index = this.vehical.features.indexOf(featureId);
      this.vehical.features.splice(index, 1);
    }
  }
  onSubmit() {
    if (this.vehical.id) {
      this.vehicalService.update(this.vehical).subscribe(data => {
        this.toastyService.success({
          title: 'Success',
          msg: 'Vehicle has been updated',
          showClose: true,
          timeout: 5000
        });
      });
    } else {
      this.vehicalService.create(this.vehical).subscribe(data => {
        this.toastyService.success({
          title: 'Success',
          msg: 'Vehicle has been added',
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['/vehicals']);
      });
    }
  }

  delete() {
    if (confirm('Are you sure to delete vehicle')) {
      this.vehicalService.delete(this.vehical.id).subscribe(data => {
        this.router.navigate(['/vehicals']);
      });
    }
  }
}
