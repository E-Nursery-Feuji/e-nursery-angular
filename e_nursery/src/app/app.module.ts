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
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';


import { NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  SPINNER,
  POSITION,
  PB_DIRECTION } from 'ngx-ui-loader';
import { PlantsComponent } from './plants/plants.component';
import { SeedsComponent } from './seeds/seeds.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { FertilizerComponent } from './fertilizer/fertilizer.component';
import { UserblogComponent } from './userblog/userblog.component';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { FooterComponent } from './footer/footer.component';
import { DiscountPipe } from './discount.pipe';

  const ngxUiLoaderConfig: NgxUiLoaderConfig={
  "bgsColor": "#1fe909",
  "bgsOpacity": 0.5,
  "bgsPosition": "center-left",
  "bgsSize": 100,
  "bgsType": "three-strings",
  "blur": 15,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#1fe909",
  "fgsPosition": "center-center",
  "fgsSize": 100,
  "fgsType": "three-strings",
  "gap": -80,
  "logoPosition": "center-center",
  "logoSize": 60,
  "logoUrl": "assets/images/loader4.gif",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
  }




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
    OrdersComponent,
    ChangepasswordComponent,
    NavbarComponent,
    PlantsComponent,
      SeedsComponent,
      AccessoriesComponent,
      FertilizerComponent,
      UserblogComponent,
      CustomerhomeComponent,
      FooterComponent,
      DiscountPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    MatCardModule,
    MatPaginatorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
