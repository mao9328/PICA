import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormattedMessageChain } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  formProduct: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private business: BusinessService
  ) { }

  ngOnInit() {

    this.formProduct = this.builder.group({
      Id: [0, [Validators.required]],
      Name: ['', [Validators.required]],
      Code: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      NormalImageURL: ['', [Validators.required]],
      SmallImageURL: ['', [Validators.required]]
    });

    this.route.params.subscribe((params: Params) => {

      if (typeof(params.id) !== 'undefined') {

        this.business.GetProduct(parseInt(params.id, 10)).subscribe((response) => {

          if (!response.Error) {

            this.formProduct.patchValue({
              Id: response.Result.Id,
              Name: response.Result.Name,
              Code: response.Result.Code,
              Price: response.Result.Price,
              Description: response.Result.Description,
              NormalImageURL: response.Result.NormalImageURL,
              SmallImageURL: response.Result.SmallImageURL
            });
          }

        });

      }

    });

  }

  getProperty(member: string) {

    return this.formProduct.get(member) as FormControl;
  }

}
