import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-purchases-report',
  templateUrl: './customer-purchases-report.component.html',
  styleUrls: ['./customer-purchases-report.component.scss']
})
export class CustomerPurchasesReportComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

  elements = 10;
  page = 0;
  total = 1;
  filterForm: FormGroup;
  Customers: any[] = [];

  ngOnInit() {

    this.filterForm = this.builder.group({
      From: [''],
      To: ['']
    });

  }

  onSearch() {

    const from = moment(this.filterForm.get('From').value).format('YYYY-MM-DD');
    const to = moment(this.filterForm.get('To').value).format('YYYY-MM-DD');

    this.spinner.show();

    this.business.GetCustomerPaymentRanking(from, to).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.Customers = response.Result;
        this.total = response.Rows;

      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });

  }

  pageChanged(pagina) {

    this.page = pagina;

    this.onSearch();

  }

}
