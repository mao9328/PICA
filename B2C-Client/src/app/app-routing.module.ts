import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './pages/master/master.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductComponent } from './pages/product/product.component';
import { MainGuard } from './app.main-guard.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';


const privateRoutes: Routes = [
  { path: 'checkout', component: CheckOutComponent, data: { IdRole: 1 } },
  { path: 'manage-account', component: ManageAccountComponent },
  { path: '**', redirectTo: '/public/home' }
];

const publicRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'view-order/:id', component: ViewOrderComponent },
  { path: '**', redirectTo: '/public/home' }
];


const routes: Routes = [
  { path: 'secure', component: MasterComponent, children: privateRoutes, canActivate: [MainGuard] },
  { path: 'public', component: MasterComponent, children: publicRoutes },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', redirectTo: '/public/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
