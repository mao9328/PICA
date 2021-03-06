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
import { OrdersComponent } from './pages/orders/orders.component';
import { CustomerPurchasesReportComponent } from './pages/customer-purchases-report/customer-purchases-report.component';
import { OrdersClosedReportComponent } from './pages/orders-closed-report/orders-closed-report.component';
import { OrdersOpenReportComponent } from './pages/orders-open-report/orders-open-report.component';
import { TopSellingProductComponent } from './pages/top-selling-product/top-selling-product.component';

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
    path: 'orders',
    component: OrdersComponent,
    data: { IdRole: 4 },
    canActivate: [MainGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { IdRole: 5 },
    canActivate: [MainGuard]
  },
  {
    path: 'offer',
    component: OfferComponent,
    data: { IdRole: 3 },
    canActivate: [MainGuard]
  },
  {
    path: 'offer/:id',
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
    path: 'customer',
    component: CustomerComponent,
    data: { IdRole: 7 },
    canActivate: [MainGuard]
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
    data: { IdRole: 7 },
    canActivate: [MainGuard]
  },
  {
    path: 'customer-purchases',
    component: CustomerPurchasesReportComponent,
    data: { IdRole: 0 },
    canActivate: [MainGuard]
  },
  {
    path: 'orders-closed',
    component: OrdersClosedReportComponent,
    data: { IdRole: 0 },
    canActivate: [MainGuard]
  },
  {
    path: 'orders-open',
    component: OrdersOpenReportComponent,
    data: { IdRole: 0 },
    canActivate: [MainGuard]
  },
  {
    path: 'top-selling-products',
    component: TopSellingProductComponent,
    data: { IdRole: 0 },
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
