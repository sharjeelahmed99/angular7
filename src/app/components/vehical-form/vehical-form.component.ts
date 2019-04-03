import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';
import { Make } from '../../modals/make';
import { Model } from '../../modals/model';

@Component({
  selector: 'app-vehical-form',
  templateUrl: './vehical-form.component.html',
  styleUrls: ['./vehical-form.component.css']
})
export class VehicalFormComponent implements OnInit {

  constructor(private makeService:MakeService) { }
  makes:Make[]
  models:Model[]
  selectedMake:number

  ngOnInit() {
    this.makeService.getMakes().subscribe((makes)=>{
      this.makes= makes;
    })
  }
  onMakeChange(){
    this.models =  this.makes.find(item=>item.id==this.selectedMake).models

  }

}
