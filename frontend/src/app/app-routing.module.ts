import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { CovidCareComponent } from './covid-care/covid-care.component';
import { HomeComponent } from './home/home/home.component';
import { OrderComponent } from './orders/order/order.component';
import { ProductComponent } from './products/product/product.component';

import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UserGuard } from './users/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  /*When we try to navigate to products the canActivate is ececuted
    if it return => true ==navigation is allowed 
    else not*/
  //{ path: 'product', component: ProductComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'covid', component: CovidCareComponent },
  { path: 'orders', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
