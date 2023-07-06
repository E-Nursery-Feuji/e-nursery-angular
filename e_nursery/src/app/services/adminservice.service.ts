import { AdminComponent } from './../admin/admin.component';
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
  constructor(private adminRepository:AdminRepository,private router:Router,
    private snackBar: MatSnackBar
)
 { }

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
        //sweetalert for successful registration
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful !',
          text: ' admin added!',
        });

       this.router.navigateByUrl("/admin");  //redirect to login page
      }
    });
  }

  getAdmin(){
  return this.adminRepository.getAdmin();
  }

  updateStatus(id:number,status:Admin){
    return this.adminRepository.update(id,status);
  }

<<<<<<< Updated upstream
  //for login validation
=======

>>>>>>> Stashed changes

}
