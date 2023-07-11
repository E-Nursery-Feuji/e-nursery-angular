import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-fertilizer',
  templateUrl: './fertilizer.component.html',
  styleUrls: ['./fertilizer.component.css']
})
export class FertilizerComponent implements OnInit {

  constructor(private productService:Productservice,private orderService:OrderService) { }

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

  //add to cart
  addToCart(fertilizer:Product){
    this.getCart();
    return this.orderService.addToCart(fertilizer);
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
