import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './pages/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SpinnerService } from './services/spinner.service';
import { BusinessService } from './services/business.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    LoginComponent,
    HomeComponent,
    CheckOutComponent,
    SignUpComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SpinnerService, BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
