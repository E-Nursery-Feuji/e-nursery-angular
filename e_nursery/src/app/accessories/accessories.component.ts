import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  constructor( private productService:Productservice) { }

  ngOnInit() {
  }

  getAccessories(){
    return this.productService.getAccessories();
  }

  getImages(){
    return this.productService.getImages();
  }

}
