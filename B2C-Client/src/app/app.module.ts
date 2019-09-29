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

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    LoginComponent,
    HomeComponent,
    CheckOutComponent,
    SignUpComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DpDatePickerModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [SpinnerService, BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
