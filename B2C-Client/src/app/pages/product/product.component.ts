import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { BusinessService } from 'src/app/services/business.service';
import { Observable, of } from 'rxjs';
import { GenericResponse } from 'src/app/model/GenericResponse';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  ready = false;
  Quantity = 1;
  product: Product;
  invalid = false;
  message = '';

  constructor(private router: Router, private route: ActivatedRoute, private business: BusinessService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      // tslint:disable-next-line:no-string-literal
      this.business.GetProduct(parseInt(params['id'], 10)).subscribe((response) => {

        if (!response.Error) {

          this.ready = true;
          this.product = response.Result;
        }

      });
    });
  }

  onClick() {

    if (this.Quantity > 0) {

      const item = new Item();

      item.Id = 0;
      item.IdOrder = 0;
      item.IdProduct = this.product.Id;
      item.Quantity = this.Quantity;
      item.Price = this.product.Price;
      item.Name = this.product.Name;

      this.business.addItemToKart(item);

      this.router.navigate(['/secure/home']);

    } else {

      this.invalid = true;
      this.message = 'La cantidad de productos debe ser mayor a cero.';

    }
  }
}
