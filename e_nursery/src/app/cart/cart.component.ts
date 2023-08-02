import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Productservice } from '../services/productservice.service';
import { JwttokenService } from '../services/jwttoken.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private orderService:OrderService ,private productService:Productservice,private jwttokenservice:JwttokenService) { }

  ngOnInit() {
  }

  getCart(){
    console.log(this.orderService.getCart());
    console.log("filter cart")
    console.log(this.jwttokenservice.getIdFromJwtToken())
    console.log(this.orderService.getCart().filter( (c) => c.quantity > 0).length)
   return this.orderService.getCart().filter( (c) => c.quantity>0);
  }

  getImages(){
   return  this.productService.getImages()
  }

  getProduct(productId:number){
    return this.productService.getProducts().filter(p=>p.id==productId)[0];
  }

  decreaseQuantity(id:number){
    console.log("id" + id);
    const cart=this.getCart().filter(c=>c.id==id)[0];
    console.log("cart")
    console.log(cart)
    cart.quantity=cart.quantity-1;
    console.log("decrease cart")
    console.log(cart)
    this.orderService.updateCartQuantity(cart);
  }

  increaseQuantity(id:number){
    console.log("id" + id);
    const cart=this.getCart().filter(c=>c.id==id)[0];
    console.log("cart")
    console.log(cart)
    cart.quantity=Number(cart.quantity)+1;
    console.log("Increase cart")
    console.log(cart)
    this.orderService.updateCartQuantity(cart);
  }

  removeItem(id:number){
    console.log("id" + id);
    const cart=this.getCart().filter(c=>c.id==id)[0];
    console.log("cart")
    console.log(cart)
    cart.quantity=0;
    console.log("delete cart")
    console.log(cart)
    this.orderService.updateCartQuantity(cart);

  }
}
