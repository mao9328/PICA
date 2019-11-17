import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { Order } from 'src/app/model/Order';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute, private business: BusinessService, private spinner: SpinnerService) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe((route) => {

      this.spinner.show();

      if (route.get('id') != null) {

        this.business.GetOrder(parseInt(route.get('id'), 10)).subscribe((response) => {

          this.spinner.hide();

          if (!response.Error) {

            this.order = response.Result;
          }

        }, (error) => {

          this.spinner.hide();

        });
      }
    });

  }
}
