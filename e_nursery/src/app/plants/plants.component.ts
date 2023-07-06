import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

constructor(private productservice: Productservice) { }

  ngOnInit() {
  }
  
  // for getting plant only
  getPlants(){
    return this.productservice.getPlants();
  }
  
  //for getting images
  getImages(){
    return this.productservice.getImages();
  }
}
