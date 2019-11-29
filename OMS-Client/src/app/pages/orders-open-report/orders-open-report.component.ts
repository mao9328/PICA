import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-orders-open-report',
  templateUrl: './orders-open-report.component.html',
  styleUrls: ['./orders-open-report.component.scss']
})
export class OrdersOpenReportComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

  elements = 10;
  page = 0;
  total = 1;
  orders: Order[] = [];

  ngOnInit() {

    this.spinner.show();

    this.loadRecords();
  }

  loadRecords() {

    this.business.GetOrdersByState(1, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.orders = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha presentado un error consultando las ordenes.', 'Error!');

    });
  }

  pageChanged(pagina) {

    this.page = pagina;

    this.loadRecords();
  }

}
