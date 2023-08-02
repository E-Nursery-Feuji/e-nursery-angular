import { CartComponent } from './cart/cart.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HasRoleGuard } from './has-role.guard';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { PlantsComponent } from './plants/plants.component';
import { FertilizerComponent } from './fertilizer/fertilizer.component';
import { SeedsComponent } from './seeds/seeds.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { UserblogComponent } from './userblog/userblog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  {
    path: 'customer',
    component: UserhomeComponent,
    //checking login or not as well as role of login user
    //these routes acessible by the both customer as well as admin
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: 'CUSTOMER',
      role1: 'ADMIN',
    },
    children:[
      {path:'home',component:CustomerhomeComponent},
      {path:'plant',component:PlantsComponent},
      {path:'fertilizer',component:FertilizerComponent},
      {path:'seeds',component:SeedsComponent},
      {path:'accessories',component:AccessoriesComponent},
      {path:'blog',component:UserblogComponent},
      {path:'cart',component:CartComponent},
      {path:'**',redirectTo:'home'}
    ]
  },
  {
    path: 'admin',
    component: AdminhomeComponent,
     //checking login or not as well as role of login user
    //these routes acessible by the only admin
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: 'ADMIN',
    },
    children: [
      { path: 'add', component: AdminComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'product', component: ProductComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '**', redirectTo: 'add' },
    ],
  },
  // Default route, redirect to home
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
