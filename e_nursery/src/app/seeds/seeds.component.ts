import { Product } from '../model/product';
import { OrderService } from './../services/order.service';
import { Productservice } from './../services/productservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit {

  constructor(private productService:Productservice,private orderService:OrderService) { }

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

  //add to cart
  addToCart(seed:Product){
    this.getCart();
    return this.orderService.addToCart(seed);
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
