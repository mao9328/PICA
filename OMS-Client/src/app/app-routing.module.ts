import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './pages/master/master.component';
import { ProductComponent } from './pages/product/product.component';

const privateRoutes: Routes = [
  { path: 'product', component: ProductComponent }
];

const routes: Routes = [
  { path: 'secure', component: MasterComponent, children: privateRoutes },
  { path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
