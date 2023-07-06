import { AdminRepository } from './../repository/admin-repository.service';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { CustomerRepository } from '../repository/customer-repository.service';
import { Router } from '@angular/router';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { log } from 'console';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  user:Admin=new Admin;
  admins:Admin[]=[];

  constructor(private adminRepository:AdminRepository,private router:Router,
    private snackBar: MatSnackBar
)
 {
  this.adminRepository.getAdmin().subscribe(data=>{
    console.log("Admin service constructor")
    console.log(data)
    if(typeof(data)=='object')
    {

    this.admins=data;
    console.log(this.admins)
    }
    else{
      console.log("Admin data is not object")
    }

  });

 }

 //for save the customer
  saveAdmin(admin:Admin)
  {
    //send to restdata
    this.adminRepository.saveAdmin(admin).subscribe(data=>{
      if(typeof(data)=='string') //checking data is in string
      {
        if(data=='present') //checking email is present or not
        {
          //sweetalert for email present
          Swal.fire({
            icon: 'error',
            title: 'Email Already Taken !',
            text: 'Please try with different Email !',
          });
        }
      }
      else if(typeof(data)=='object') //checking data is in object
      {
        console.log(data)

        //sweetalert for successful registration
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful !',
          text: ' admin added!',

        });
        console.log("admin service save data")
        this.admins.push(data);
        console.log(this.admins)
        this.router.navigateByUrl("/admin/add"); //redirect to login page
      }
    });
  }

  getAdmin(){
    console.log(this.admins)
  return this.admins;;
  }

  updateStatus(id: number) {
    this.adminRepository.updateStatus(id).subscribe(data => {
      console.log(data);
      const index = this.admins.findIndex(admin => admin.id === id);
      if (index !== -1) {
        this.admins[index] = data; // Update the object at the index with the new data
      }
    });
  }

  update(id:number,status:Admin){
    return this.adminRepository.update(id,status).subscribe(data=>
      {
        const index = this.admins.findIndex(admin => admin.id === id);
      if (index !== -1) {
        this.admins[index] = data;
      }
      });
  }



}
