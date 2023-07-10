
import { Router } from '@angular/router';
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
  update:boolean=true;
  admins !: Admin[];
  editid!:number;
  heading!:string;
  hide:boolean=true;
  nameSearch:String= ""


  constructor(private formBuilder: FormBuilder,private adminService:AdminService,router:Router)
  {
    this.registrationForm = this.formBuilder.group({
      id:[''],
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      role:[''],
      status:[''],

    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.getAdmins();

  }



//on submit
  submitForm()
  {

    console.log(this.editid)
    if(this.editid){
      this.editid=0;
      console.log(this.registrationForm.value.id)
      //encode the password and confrimpassword
      // this.registrationForm.value.confirmPassword=btoa(this.registrationForm.value.confirmPassword);
      // this.registrationForm.value.password=btoa(this.registrationForm.value.password);
      console.log(this.registrationForm.value)
      this.admin=this.registrationForm.value
      console.log(this.admin)
      console.log(this.admin.id)
       this.adminService.update(this.admin.id,this.admin)
        this.show=!(this.show);

    }

    else{
      console.log("entered")
    if (this.registrationForm.invalid) {
      return;
    }
    if(this.registrationForm.valid)
    {
      //encode the password and confrimpassword

      this.registrationForm.value.confirmPassword=btoa(this.registrationForm.value.confirmPassword);
      this.registrationForm.value.password=btoa(this.registrationForm.value.password);
      console.log(this.registrationForm.value.password)
      this.admin=this.registrationForm.value;
      this.admin.role="ADMIN";
      this.admin.status="Active";
      this.adminService.saveAdmin(this.admin); //send to service
      this.show=!(this.show);


    }
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
    this.hide=true;
    this.heading="Add Admin";
    this.show=!(this.show);
    this.getAdmins();
    this.registrationForm.patchValue({
      id:'',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confirmPassword:'',
      status:'',
      role:'',

    })

  }


  editAdmin(admin:Admin)
  {
    this.hide=true;
    this.hide=!(this.hide);
    this.heading="Edit Admin";
    this.editid=admin.id;
    this.show=!(this.show);
    this.registrationForm.patchValue({
      id:admin.id,
      first_name:admin.first_name,
      last_name:admin.last_name,
      email:admin.email,
      password:admin.password,
      confirmPassword:admin.password,
      status:admin.status,
      role:admin.role,

    })
  }


  activeStatus!: boolean;


  updatestatus(id:number) {
    console.log(id)

    this.adminService.updateStatus(id);
  }



  getAdmins(){
    if (this.nameSearch===""){
     return this.adminService.getAdmin()
    }
    else{
     let searchTerm = this.nameSearch.trim().toLowerCase();
    return this.adminService.getAdmin().filter(a => a.first_name.toLowerCase().includes(searchTerm)||a.last_name.toLowerCase().includes(searchTerm)||a.email.toLowerCase().includes(searchTerm))
   }
   }


}
