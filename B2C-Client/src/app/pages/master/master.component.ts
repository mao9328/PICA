import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  shoppingKartCounter: number;

  constructor(private business: BusinessService) { }

  ngOnInit() {

    this.shoppingKartCounter = this.business.getItems().length;

    this.business.shippingKartSubject.subscribe((value) => {

      this.shoppingKartCounter = this.business.getItems().length;
    });
  }

}
