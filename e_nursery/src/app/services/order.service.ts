import { Customer } from './../model/customer';
import { Cart } from './../model/cart';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerRepository } from './../repository/customer-repository.service';
import { OrderReposistoryService } from './../repository/order-reposistory.service';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
// import { Cart } from '../model/cart';
import { JwttokenService } from './jwttoken.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cart:Cart=new Cart();


constructor(private orderReposistoryService:OrderReposistoryService,private customerRepository:CustomerRepository,private JwttokenService:JwttokenService) { }

addToCart(plant:Product){
  this.cart.id=0;
  this.cart.quantity=1;
  this.cart.product=plant.id;
  const email=this.JwttokenService.getEmailFromJwtToken()
  this.customerRepository.customerByEMail(email).subscribe(
    (response) =>{
      const customer = Object.values(response)[0];
      console.log("customer id")
      console.log(customer.id);
      this.cart.customer=customer.id;
    },
    (error) =>{
      Swal.fire({
        icon: 'error',
        text: error,
      });
    }
  );
  console.log(this.cart)
  this.orderReposistoryService.addToCart(this.cart).subscribe(
    data => console.log(data)
  );
    }

}


