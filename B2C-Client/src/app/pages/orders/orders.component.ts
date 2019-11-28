import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private builder: FormBuilder
  ) { }

  orders: Order[] = [];
  elements = 10;
  page = 0;
  total = 1;
  showModal = false;

  formCancelar: FormGroup;

  ngOnInit() {

    this.formCancelar = this.builder.group({
      IdOrder: [0]
    });

    this.loadOrders();

  }

  private loadOrders() {

    this.spinner.show();

    this.business.GetCustomerByEmail(this.business.GetLocalStorage(environment.UserKey)).subscribe((response) => {

      this.business.GetOrders(response.Result.Id, this.elements, this.page).subscribe((responseOrder) => {

        this.spinner.hide();

        if (!responseOrder.Error) {

          this.orders = responseOrder.Result;
          this.total = responseOrder.Rows;
        }

      }, (error) => {

        this.spinner.hide();
        this.toast.error(error.Message, 'Error!');

      });

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });

  }

  openCancel(id: number) {

    this.formCancelar.patchValue({
      IdOrder: id
    });

    this.showModal = true;

  }

  onCancelOrder() {

    this.showModal = false;

    this.spinner.show();

    this.business.UpdatStateOrder(this.formCancelar.value.IdOrder).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.toast.success('Se ha cancelado la orden satisfactoriamente', 'Exito!');

        this.loadOrders();

      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });
  }

  onAbort() {

    this.formCancelar.reset();
    this.showModal = false;

  }

}
