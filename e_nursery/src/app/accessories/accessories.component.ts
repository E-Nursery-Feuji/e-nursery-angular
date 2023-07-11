import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Productservice } from '../services/productservice.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  constructor( private productService:Productservice,private orderService:OrderService) { }

  ngOnInit() {
  }

  getAccessories(){
    return this.productService.getAccessories();
  }

  getImages(){
    return this.productService.getImages();
  }

  //add to cart
  addToCart(accessorie:Product){
    this.getCart();
    return this.orderService.addToCart(accessorie);
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
