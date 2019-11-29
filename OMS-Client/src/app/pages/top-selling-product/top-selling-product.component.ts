import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Product } from 'src/app/model/Product';


@Component({
  selector: 'app-top-selling-product',
  templateUrl: './top-selling-product.component.html',
  styleUrls: ['./top-selling-product.component.scss']
})
export class TopSellingProductComponent implements OnInit {

  elements = 10;
  page = 0;
  total = 1;
  filterForm: FormGroup;
  products: Product[];

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

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

    this.business.GetProducts(this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
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
