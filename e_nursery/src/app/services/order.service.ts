import { Customer } from './../model/customer';
import { Cart } from './../model/cart';
import { CustomerRepository } from './../repository/customer-repository.service';
import { OrderReposistoryService } from './../repository/order-reposistory.service';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { JwttokenService } from './jwttoken.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cart:Cart=new Cart();
  carts:Cart[]=[];
  customer:Customer=new Customer();
  numberOfQuantity!:number;


constructor(private orderReposistoryService:OrderReposistoryService,
private customerRepository:CustomerRepository,private JwttokenService:JwttokenService) {
  const email=this.JwttokenService.getEmailFromJwtToken();
  this.customerRepository.customerByEMail(email).subscribe(
    data => {
      this.customer.id = Object.values(data)[0].id;
      this.orderReposistoryService.getCart(this.customer.id).subscribe(
        data =>{
          this.carts=Object.values(data)[0];
        });
    });
 }

//add to cart implementations
addToCart(product: Product) {
  const cart = this.carts.filter((c) => c.product == product.id)[0];
  if (cart) {
    cart.quantity = 1;
    this.orderReposistoryService.updateToCart(cart).subscribe();
  } else {
    this.cart.id = 0;
    this.cart.quantity = 1;
    this.cart.product = product.id;
    const email = this.JwttokenService.getEmailFromJwtToken();
    this.customerRepository.customerByEMail(email).subscribe(
      (response) => {
        const customer = Object.values(response)[0];
        this.cart.customer = customer.id;
        this.orderReposistoryService.addToCart(this.cart).subscribe(
          (data) => {
            this.carts.push(Object.assign(data))
            this.numberOfQuantity = this.carts.reduce((total, cart) => total + Number(cart.quantity), 0);
            console.log("qunatity"+this.numberOfQuantity)
            this.getCart();
          }
        );
      },
      (error) => {
        Swal.fire({
          icon: "error",
          text: error,
        });
      }
    );
  }
}


  //fetch the cart from db
  getCart(){
   return this.carts;
  }


  //for update the cart quantity
  updateCartQuantity(cart:Cart){
    this.orderReposistoryService.updateToCart(cart).subscribe()
  }

}


