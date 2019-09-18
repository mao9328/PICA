import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formFilter: FormGroup;

  products: Product[];
  topFiveProducts: Product[];

  constructor(private business: BusinessService, private builder: FormBuilder) { }

  ngOnInit() {

    this.formFilter = this.builder.group({
      filter: ['']
    });

    this.formFilter.get('filter').valueChanges.subscribe((value) => {

      this.business.GetProductsByNameOrDesc(value).subscribe((response) => {

        if (!response.Error) {

          this.products = response.Result;
        }

      });

    });

    this.business.GetProducts().subscribe((response) => {

      if (!response.Error) {

        this.products = response.Result;
      }

    });

    this.business.GetTopFiveProducts().subscribe((response) => {

      if (!response.Error) {

        this.topFiveProducts = response.Result;
      }
    });
  }

  addItem(item: Product) {

    this.business.addItemToKart();
  }
}
