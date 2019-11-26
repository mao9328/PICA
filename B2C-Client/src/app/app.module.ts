import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './pages/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SpinnerService } from './services/spinner.service';
import { BusinessService } from './services/business.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ProductComponent } from './pages/product/product.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { MainGuard } from './app.main-guard.guard';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    LoginComponent,
    HomeComponent,
    CheckOutComponent,
    SignUpComponent,
    ProductComponent,
    OrdersComponent,
    ViewOrderComponent,
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DpDatePickerModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [SpinnerService, BusinessService, MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
