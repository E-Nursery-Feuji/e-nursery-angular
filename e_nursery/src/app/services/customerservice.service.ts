import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerRepository } from '../repository/customer-repository.service';
import { Router } from '@angular/router';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { log } from 'console';
import { JwttokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  user:Customer=new Customer;
  email:string='';
  constructor(private customerRepository:CustomerRepository,private router:Router,
    private snackBar: MatSnackBar,private jwttokenserivce:JwttokenService
)
 { }

 //for save the customer
  saveCustomer(customer:Customer)
  {
    //send to restdata
    this.customerRepository.saveCustomer(customer).subscribe(data=>{
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
          text: 'You can login now !',
        });
        this.router.navigateByUrl("/login"); //redirect to login page
      }
    });
  }

  //for login validation
  login(login_data:object)
  {
    this.customerRepository.login(login_data).subscribe(data=>{
      console.log(data);
      if(typeof(data)=='string') //checking type of data
      {
        if(data=='Email not found') //checking email is present or not
        {
          //sweetalert for email not present
          Swal.fire({
            title: 'Email is not register?',
            text: "Please try again or register first!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Register', //for register
            cancelButtonText: 'Try Again!', //for login
          }).then((result) => {
            if (result.isConfirmed)
            {
              this.router.navigateByUrl("/register"); //redirect to registerpage
            }
            else
            {
              this.router.navigateByUrl("/login"); //redirect to login page
            }
          });
        }
        else if(data=='Incorrect Password') //if password is incorrect
        {
            //has to write snak baar
            this.snackBar.open("Password Incorrect", '', {
              duration: 2000, // Set the duration in milliseconds
              verticalPosition: 'top', // Position at the top
              panelClass: 'snackbar-container' //for apply custome css
            })
        }
      }
      else if(typeof(data)=='object') //checking if data is object
      {
        console.log(data);
        console.log(Object.values(data)[1])
        console.log(typeof(data) )
        localStorage.setItem('token',Object.values(data)[1])
        console.log(Object.values(data)[0].role)
        if(Object.values(data)[0].role=='CUSTOMER') //it is user
        {
          this.router.navigateByUrl("/customer"); //negigate to customer home page
        }
        else if(Object.values(data)[0].role=='ADMIN')
        {
          //for choose the role of admin while login
          Swal.fire({
            customClass: {
              confirmButton: 'swal-button',
              cancelButton: 'swal-button',
            },
            title: 'Login as ?',
            // buttonsStyling: false,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '<i class="fas fa-users"></i> User',
            cancelButtonText: '<i class="fas fa-user"></i> Admin',
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // Login as User
              this.router.navigateByUrl("/customer");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Login as Admin
              this.router.navigateByUrl("/admin");
            }
          });
        }
      }
    });
  }

  // for send mail
  sendEmail(emaildata:object)
  {
    this.email=Object.values(emaildata)[0];
    this.customerRepository.sendEmail(emaildata).subscribe(data=>{
      console.log(data);
      console.log(typeof(data));
      if(typeof(data)=='number')
      {
        const otp=""+data;
        localStorage.setItem('otp',otp)
      }
      else if(typeof(data)=='string')
      {
        if(data=='Email invalid')
        {
          //sweetalert for email not present
          Swal.fire({
            title: 'Email is not register?',
            text: "Please try again or register first!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Register', //for register
            cancelButtonText: 'Try Again!', //for login
          }).then((result) => {
            if (result.isConfirmed)
            {
              this.router.navigateByUrl("/register"); //redirect to registerpage
            }
            else
            {
              this.router.navigateByUrl("/login"); //redirect to login page
            }
          });
        }
        else if(data=='Something Went Wrong')
        {
          //sweetalert for successful registration
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong !',
            text: "Please Check your internet connection!",
          });
        }
      }
    });
  }

  checkOtp(otp:string)
  {
    if(otp==localStorage.getItem('otp'))
    {
      this.router.navigateByUrl("/changepassword")
    }
    else
    {
        //has to write snak baar
        this.snackBar.open("Otp Incorrect", '', {
          duration: 2000, // Set the duration in milliseconds
          verticalPosition: 'top', // Position at the top
          panelClass: 'snackbar-container' //for apply custome css
        })
    }
  }

  changePassword(changePasswordData:object)
  {
    if(this.email)
    {
      changePasswordData=Object.assign({},changePasswordData,{email:this.email});
    }
    else
    {
      this.email=this.jwttokenserivce.getEmailFromJwtToken();
      changePasswordData=Object.assign({},changePasswordData,{email:this.email});
    }
    console.log(changePasswordData);
    this.customerRepository.changePassword(changePasswordData).subscribe(data=>
      {
        if(data=='Success')
        {
          //sweetalert for successful registration
          Swal.fire({
            icon: 'success',
            title: 'Password Chnaged Successful !',
          });
          if(this.jwttokenserivce.getRoleFromJwtToken()=='CUSTOMER')
          {
            this.router.navigateByUrl("/customer");
          }
          else if(this.jwttokenserivce.getRoleFromJwtToken()=='ADMIN')
          {
            this.router.navigateByUrl("/admin");
          }
          else
          {
            this.router.navigateByUrl("/login");
          }
        }
      });
  }
}
