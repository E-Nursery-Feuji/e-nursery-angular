import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RegisterationComponent } from './registeration/registeration.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {HttpClientModule} from '@angular/common/http';
import { UserhomeComponent } from './userhome/userhome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterationComponent,
    ForgotpasswordComponent,
    UserhomeComponent,
    AdminhomeComponent,
    AdminComponent,
    BlogComponent,
    ProductComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
