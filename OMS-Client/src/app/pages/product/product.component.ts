import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormattedMessageChain } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
      Images: this.builder.array([])
    });

    this.route.params.subscribe((params: Params) => {

      if (typeof (params.id) !== 'undefined') {

        this.business.GetProduct(parseInt(params.id, 10)).subscribe((response) => {

          if (!response.Error) {

            this.formProduct.patchValue({
              Id: response.Result.Id,
              Name: response.Result.Name,
              Code: response.Result.Code,
              Price: response.Result.Price,
              Description: response.Result.Description
            });
          }

        });

      }

    });

  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }

  addImage() {

    (this.formProduct.get('Images') as FormArray).push(this.getImage());
  }

  getImage(): FormGroup {
    return this.builder.group({
      Description: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      IsThumbnail: ['', [Validators.required]],
      Url: ['', [Validators.required]],
      IdProduct: ['', [Validators.required]]
    });
  }

  GetImages(): FormArray {
    return (this.formProduct.get('Images') as FormArray);
  }

}
