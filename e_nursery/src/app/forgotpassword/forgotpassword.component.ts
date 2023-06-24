import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;
  submitted:boolean = false;
  constructor(private formBuilder:FormBuilder)
  {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  forgotPasswordSubmit()
  {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid)
    {
      return;
    }
  }

}
