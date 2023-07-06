import { Productservice } from './../services/productservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit {

  constructor(private productService:Productservice) { }

  ngOnInit() {
  }

  getSeeds()
  {
    return this.productService.getSeeds();
  }

  getImages()
  {
    return this.productService.getImages();
  }

}
