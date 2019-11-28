import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Order } from 'src/app/model/Order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

  orders: Order[] = [];
  filterForm: FormGroup;
  elements = 10;
  page = 0;
  total = 1;

  showCriteria = false;
  showDateRange = false;
  showState = false;

  ngOnInit() {

    this.filterForm = this.builder.group({
      Filter: [''],
      Criteria: [''],
      From: [''],
      To: [''],
      State: ['1']
    });

    this.filterForm.get('Filter').valueChanges.subscribe((value) => {

      this.orders = [];

      switch (value) {

        case 'E':

          this.showCriteria = false;
          this.showDateRange = false;
          this.showState = true;

          break;

        case 'NP':

          this.showCriteria = true;
          this.showDateRange = false;
          this.showState = false;

          break;

        case 'F':

          this.showCriteria = false;
          this.showDateRange = true;
          this.showState = true;

          break;

        case 'C':

          this.showCriteria = true;
          this.showDateRange = false;
          this.showState = false;

          break;

        case 'V':

          this.showCriteria = false;
          this.showDateRange = true;
          this.showState = false;

          break;

        case 'I':

          this.showCriteria = true;
          this.showDateRange = false;
          this.showState = false;

          break;

      }

    });
  }

  getOrdersByState(id: number) {

    this.spinner.show();

    this.business.GetOrdersByState(id, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por estado.', 'Error!');

    });

  }

  getOrdersByProductId(id: number, ) {

    this.spinner.show();

    this.business.GetOrdersByProductId(id, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por nombre de producto.', 'Error!');

    });
  }

  getOrdersByPaymentRanking(idState: number, from: string, to: string) {

    this.spinner.show();

    this.business.GetOrdersByPaymentRanking(idState, from, to, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por facturacion.', 'Error!');

    });
  }

  getOrdersBySellingProductRanking(from: string, to: string) {

    this.spinner.show();

    this.business.GetOrdersBySellingProductRanking(from, to, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por facturacion.', 'Error!');

    });
  }

  getOrdersByCustomer(id: number) {

    this.spinner.show();

    this.business.GetOrdersByCustomer(id, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por cliente.', 'Error!');

    });
  }

  getOrdersById(id: number) {

    this.spinner.show();

    this.business.GetOrdersById(id).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = [response.Result];
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes por cliente.', 'Error!');

    });
  }

  onSearch() {

    const filter = this.filterForm.get('Filter').value;
    const criteria = this.filterForm.get('Criteria').value;
    const from = moment(this.filterForm.get('From').value).format('YYYY-MM-DD');
    const to = moment(this.filterForm.get('To').value).format('YYYY-MM-DD');
    const idState = this.filterForm.get('State').value;

    switch (filter) {

      case 'F':

        this.getOrdersByPaymentRanking(idState, from, to);

        break;

      case 'V':

        this.getOrdersBySellingProductRanking(from, to);

        break;

      case 'C':

        this.getOrdersByCustomer(criteria);

        break;

      case 'NP':

        this.getOrdersByProductId(criteria);
        break;

      case 'E':

        this.getOrdersByState(idState);

        break;

      case 'I':

        this.getOrdersById(criteria);

        break;

    }
  }

  pageChanged(pagina) {

    this.page = pagina;

    this.onSearch();

  }
}
