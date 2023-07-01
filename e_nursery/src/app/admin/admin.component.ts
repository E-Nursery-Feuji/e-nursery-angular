import { AdminService } from './../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addAdmin:FormGroup
  show:boolean=true;

  admin:Admin=new Admin;
  constructor(private formBuilder : FormBuilder,private adminService : AdminService) {

    this.addAdmin = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    })

  }

  ngOnInit(): void {
  }

  openDialog()
  {
    this.show=!this.show;
    console.log("add admin")
  }
  editProduct()
  {
    this.openDialog();
  }
  deleteProduct()
  {
    confirm("Are You sure Want to Delete!");
  }

  saveAdmin()
  {
    this.admin.first_name=this.addAdmin.value.first_name
    this.admin.last_name = this.addAdmin.value.last_name
    this.admin.email = this.addAdmin.value.email
    this.admin.password = this.addAdmin.value.password
    this.admin.role = "ADMIN"
    console.log(this.admin)
    this.adminService.saveAdmin(this.admin);
  }


}
