import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  emailSubmitForm:FormGroup;
  otpSubmitForm:FormGroup;
  emailSubmitted:boolean = false;
  otpSubmitted:boolean = false;
  show:boolean=false;
  constructor(private formBuilder:FormBuilder,private router:Router)
  {
    this.emailSubmitForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpSubmitForm=this.formBuilder.group({
      otp:['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  emailSubmit()
  {
    this.emailSubmitted = true;
    if (this.emailSubmitForm.invalid)
    {
      return;
    }
    if(this.emailSubmitForm.valid)
    {
      console.log(this.emailSubmitForm.value.email);
      this.show=true;
    }
  }

  otpSubmit()
  {
    this.otpSubmitted=true;
    if(this.otpSubmitForm.invalid)
    {
      return;
    }
    if(this.otpSubmitForm.valid)
    {
      console.log(this.otpSubmitForm.value.otp);
      this.router.navigateByUrl("/changepassword")
    }
  }

}
