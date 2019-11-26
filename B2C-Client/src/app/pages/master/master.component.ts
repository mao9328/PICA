import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  shoppingKartCounter: number;

  constructor(private business: BusinessService, private router: Router) { }

  ngOnInit() {

    this.shoppingKartCounter = this.business.getItems().length;

    this.business.shippingKartSubject.subscribe((value) => {

      this.shoppingKartCounter = this.business.getItems().length;
    });
  }

  logOut() {

    localStorage.clear();

    this.router.navigate(['/login']);
  }

}
