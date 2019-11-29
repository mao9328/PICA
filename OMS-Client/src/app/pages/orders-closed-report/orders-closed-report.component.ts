import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/Order';
import * as moment from 'moment';

@Component({
  selector: 'app-orders-closed-report',
  templateUrl: './orders-closed-report.component.html',
  styleUrls: ['./orders-closed-report.component.scss']
})
export class OrdersClosedReportComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

  orders: Order[] = [];
  elements = 10;
  page = 0;
  total = 1;
  filterForm: FormGroup;

  ngOnInit() {

    this.filterForm = this.builder.group({
      From: [''],
      To: ['']
    });

  }

  pageChanged(pagina) {

    this.page = pagina;

    this.onSearch();

  }

  onSearch() {


    const from = moment(this.filterForm.get('From').value).format('YYYY-MM-DD');
    const to = moment(this.filterForm.get('To').value).format('YYYY-MM-DD');

    this.business.GetOrdersByPaymentRanking(2, from, to, this.elements, this.page).subscribe((response) => {

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

}
