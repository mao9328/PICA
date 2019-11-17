import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formFilter: FormGroup;

  products: Product[];
  topFiveProducts: Product[];

  currentOffer = 0;

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

  addItem(product: Product) {

    let item = new Item();

    item.Id = 0;
    item.IdOrder = 0;
    item.ProductCode = product.Code;
    item.Quantity = 1;
    item.Price = product.Price;
    item.Name = product.Name;

    this.business.addItemToKart(item);
  }

  nextOffer() {

    if (this.currentOffer < 4) {

      this.currentOffer++;
    } else {

      this.currentOffer = 0;
    }
  }
  previousOffer() {

    if (this.currentOffer > 0) {

      this.currentOffer--;
    } else {

      this.currentOffer = 5;
    }
  }

  goToOffer(index: number) {

    this.currentOffer = index;
  }
}
