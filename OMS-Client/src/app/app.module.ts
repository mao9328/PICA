import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
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
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [BrokerService, BusinessService, SpinnerService, MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
