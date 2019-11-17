import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './pages/master/master.component';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { OfferComponent } from './pages/offer/offer.component';
import { OffersComponent } from './pages/offers/offers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { MainGuard } from './app.main-guard.guard';

const privateRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { IdRole: 0 },
    canActivate: [MainGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { IdRole: 2 },
    canActivate: [MainGuard]
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    data: { IdRole: 2 },
    canActivate: [MainGuard]
  },
  {
    path: 'products',
    component: ListProductsComponent,
    data: { IdRole: 1 },
    canActivate: [MainGuard]
  },
  {
    path: 'offer',
    component: OfferComponent,
    data: { IdRole: 3 },
    canActivate: [MainGuard]
  },
  {
    path: 'offers',
    component: OffersComponent,
    data: { IdRole: 3 },
    canActivate: [MainGuard]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { IdRole: 6 },
    canActivate: [MainGuard]
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
    data: { IdRole: 7 },
    canActivate: [MainGuard]
  }
];

const routes: Routes = [
  { path: 'secure', component: MasterComponent, children: privateRoutes },
  { path: 'login', component: LoginComponent },
  { path: 'login/:retUrl', component: LoginComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
