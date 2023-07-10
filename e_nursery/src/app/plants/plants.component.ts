import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';
import { Product } from '../model/product';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

constructor(private productservice: Productservice,private orderService:OrderService) { }

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

  //add to cart
  addToCart(plant:Product){
    // console.log(plant)
    this.orderService.addToCart(plant);
  }
}
