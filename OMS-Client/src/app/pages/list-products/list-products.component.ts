import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[];

  constructor(private business: BusinessService, private spinner: SpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    this.business.GetProducts().subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
      }
    }, () => {

      this.spinner.hide();
    });
  }
}
