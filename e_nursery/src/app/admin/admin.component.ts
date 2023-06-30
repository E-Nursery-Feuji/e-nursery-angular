import { Admin } from './../model/admin';
import { AdminService } from './../services/adminservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  registrationForm: FormGroup;
  admin:Admin=new Admin();
  show:boolean=true;
  admins !: Admin[];

  constructor(private formBuilder: FormBuilder,private adminService:AdminService)
  {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    this.getAdmins();
    throw new Error('Method not implemented.');

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
      this.admin=this.registrationForm.value;
      this.admin.role="ADMIN";
      this.admin.status="active";
      this.adminService.saveAdmin(this.admin); //send to service
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

  openDialog()
  {
    this.show=!(this.show);
  }
  editAdmin()
  {
    this.openDialog();
  }

  status()
  {
    confirm("Are You sure Want to change the status!");
  }

getAdmins(){
  this.adminService.getAdmin().subscribe(data=>
    {
      this.admins=data;
    })
}

}
