import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/model/Item';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/model/Offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formFilter: FormGroup;

  products: Product[];
  topFiveProducts: Offer[];

  currentOffer = 0;
  elements = 10;
  page = 1;
  total = 0;

  constructor(
    private business: BusinessService,
    private builder: FormBuilder,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {

    this.spinner.show();

    this.formFilter = this.builder.group({
      filter: [''],
      target: ['T', [Validators.required]]
    });

    this.business.GetProducts(this.page, this.elements).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
        this.total = response.Rows;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error('Se ha producido un error consultado los productos', 'Error');

    });

    this.business.GetTopFiveProducts().subscribe((response) => {

      if (!response.Error) {

        this.topFiveProducts = response.Result;
      }
    });
  }

  addItem(product: Product) {

    const item = new Item();

    item.Id = 0;
    item.IdOrder = 0;
    item.ProductId = product.Id;
    item.Quantity = 1;
    item.Price = product.ListPrice;
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

  pageChanged(pagina) {

    console.log(pagina);
  }

  onSearch() {

    this.spinner.show();

    const value = this.formFilter.get('filter').value;

    const target = this.formFilter.get('target').value;

    if (target == 'C') {

      this.business.GetProductsByCode(value, this.elements, this.page).subscribe((response) => {

        this.spinner.hide();

        if (!response.Error) {

          this.products = response.Result;
          this.total = response.Rows;
        }
      }, (error) => {

        this.spinner.hide();

        this.toast.error('Se ha producido un error consultado los productos', 'Error');

      });

    } else if (target == 'ND') {

      this.business.GetProductsByNameOrDesc(value, this.elements, this.page).subscribe((response) => {

        this.spinner.hide();

        if (!response.Error) {

          this.products = response.Result;
          this.total = response.Rows;
        }
      }, (error) => {

        this.spinner.hide();

        this.toast.error('Se ha producido un error consultado los productos', 'Error');

      });
    } else {

      this.business.GetProducts(this.page, this.elements).subscribe((response) => {

        this.spinner.hide();

        if (!response.Error) {

          this.products = response.Result;
          this.total = response.Rows;
        }

      }, (error) => {

        this.spinner.hide();

        this.toast.error('Se ha producido un error consultado los productos', 'Error');

      });

    }
  }
}
