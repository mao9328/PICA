import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { Order } from 'src/app/model/Order';
import { SpinnerService } from 'src/app/services/spinner.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: Order;
  ready = false;
  constructor(
    private route: ActivatedRoute,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {

      this.spinner.show();

      if (params.id !== undefined) {

        this.business.GetOrder(parseInt(params.id, 10)).subscribe((response) => {

          this.spinner.hide();

          if (!response.Error) {

            this.order = response.Result;

            this.ready = true;
          }

        }, (error) => {

          this.spinner.hide();

          this.toast.error('Se ha producido un error consultando la orden', 'Error');

        });
      }
    });

  }
}
