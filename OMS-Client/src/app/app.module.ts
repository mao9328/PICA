import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';
import { MasterComponent } from './pages/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { BrokerService } from './services/broker.service';
import { BusinessService } from './services/business.service';
import { SpinnerService } from './services/spinner.service';
import { OfferComponent } from './pages/offer/offer.component';
import { OffersComponent } from './pages/offers/offers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { MainGuard } from './app.main-guard.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import { LoadImgComponent } from './components/load-img/load-img.component';
import { OrdersClosedReportComponent } from './pages/orders-closed-report/orders-closed-report.component';
import { CustomerPurchasesReportComponent } from './pages/customer-purchases-report/customer-purchases-report.component';
import { OrdersOpenReportComponent } from './pages/orders-open-report/orders-open-report.component';
import { TopSellingProductComponent } from './pages/top-selling-product/top-selling-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MasterComponent,
    LoginComponent,
    HomeComponent,
    ListProductsComponent,
    OfferComponent,
    OffersComponent,
    CustomersComponent,
    CustomerComponent,
    OrdersComponent,
    LoadImgComponent,
    OrdersClosedReportComponent,
    CustomerPurchasesReportComponent,
    OrdersOpenReportComponent,
    TopSellingProductComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [BrokerService, BusinessService, SpinnerService, MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
