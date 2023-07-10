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
   this.getCart();
   return this.orderService.addToCart(plant);
  }

  //get products which in cart
  getCart(){
   return this.orderService.getCart();
  }

  //for add to cart button swap
  getAdd(id:number)
  {
    const index=this.getCart().findIndex(c=>c.product==id)
    if(index == -1)
      return false;
    else
      return true;
  }

  // for get the quantity
  getQuantity(id:number)
  {
    return this.getCart().filter(c=>c.product==id)[0].quantity;
  }

  //for quantity add
  addQuantity(id:number)
  {
    const cart=this.getCart().filter(c=>c.product==id)[0];
    cart.quantity=Number(cart.quantity)+1;
    this.orderService.updateCartQuantity(cart);
  }

  // for quantity remove
  removeQuantity(id:number)
  {
    const cart=this.getCart().filter(c=>c.product==id)[0];
    cart.quantity=cart.quantity-1;
    this.orderService.updateCartQuantity(cart);
  }
}
