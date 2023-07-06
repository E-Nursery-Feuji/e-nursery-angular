import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';

@Component({
  selector: 'app-fertilizer',
  templateUrl: './fertilizer.component.html',
  styleUrls: ['./fertilizer.component.css']
})
export class FertilizerComponent implements OnInit {

  constructor(private productService:Productservice) { }

  ngOnInit() {
  }

  grtFertilizers()
  {
    return this.productService.getFertilizers();
  }

  getImages()
  {
    return this.productService.getImages();
  }
}
