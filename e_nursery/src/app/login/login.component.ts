import { CustomerService } from './../services/customerservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted:boolean = false;


  constructor(private formBuilder:FormBuilder,private customerService:CustomerService)
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void
  {

  }

  loginSubmit()
  {
    this.submitted = true;
    if (this.loginForm.invalid)
    {
      return;
    }
    else
    {
      var password=btoa(this.loginForm.value.password);
      var email=this.loginForm.value.email;
      this.customerService.login(email,password);
    }
  }
}
