import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';
import { DiscountPipe } from '../discount.pipe';


@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {


  constructor(private productservice: Productservice) { }

  ngOnInit() {



  }

  //for getting plant only
  getPlants(){
    console.log(this.productservice.getPlants())
    console.log(this.productservice.getProducts())
    return this.productservice.getPlants();
  }

  //for getting images
  getImages(){
    console.log("images")
    console.log(this.productservice.getImages())
    return this.productservice.getImages();

  }

  //for getting plant only
  // getPlants(){
  //   console.log(this.productservice.getPlants())
  //   console.log(this.productservice.getProducts())
  //   return this.productservice.getPlants();
  // }

  // //for getting images
  // getImages(){
  //   console.log("images")
  //   console.log(this.productservice.getImages())
  //   return this.productservice.getImages();
  // }



}
