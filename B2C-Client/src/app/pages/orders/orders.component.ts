import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private business: BusinessService, private spinner: SpinnerService) { }

  orders: Order[] = [];

  ngOnInit() {

    this.spinner.show();

    this.business.GetOrders().subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
      }

    }, (error) => {

      this.spinner.hide();

    });

  }

}
