import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customerservice.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {

  registrationForm: FormGroup;
  customer:Customer=new Customer();

  constructor(private formBuilder: FormBuilder,private customerService:CustomerService)
  {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

//on submit
  submitForm()
  {
    if (this.registrationForm.invalid) {
      return;
    }
    if(this.registrationForm.valid)
    {
      //encode the password and confrimpassword
      this.registrationForm.value.confirmPassword=btoa(this.registrationForm.value.confirmPassword);
      this.registrationForm.value.password=btoa(this.registrationForm.value.password);
      this.customer=this.registrationForm.value;
      this.customer.role="NORMAL";
      this.customerService.saveCustomer(this.customer); //send to service
    }
  }

  // for password match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

}







