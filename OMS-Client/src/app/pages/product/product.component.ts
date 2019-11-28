import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormattedMessageChain } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { LoadImgComponent } from 'src/app/components/load-img/load-img.component';
import { Observable, forkJoin } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChildren(LoadImgComponent) files !: QueryList<LoadImgComponent>;

  formProduct: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {

    this.formProduct = this.builder.group({
      Id: [0],
      Name: ['', [Validators.required]],
      Code: ['', [Validators.required]],
      ListPrice: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      IdCategory: ['1'],
      IdProducer: ['1'],
      IdProvider: ['1'],
      IsActive: [true],
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
              Price: response.Result.ListPrice,
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

    const count = (this.formProduct.get('Images') as FormArray).length;

    if (count > 0) {

      if ((this.formProduct.get('Images') as FormArray).at(count - 1).valid) {

        (this.formProduct.get('Images') as FormArray).push(this.getImage());
      }
    } else {

      (this.formProduct.get('Images') as FormArray).push(this.getImage());
    }
  }

  getImage(): FormGroup {
    return this.builder.group({
      Description: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      IsThumbnail: [false],
      Url: [''],
      IdProduct: [0]
    });
  }

  GetImages(): FormArray {
    return (this.formProduct.get('Images') as FormArray);
  }

  saveImages() {

    this.spinner.show();

    const calls = [];

    this.files.toArray().forEach((file) => {

      calls.push(file.onSubmit());

    });

    forkJoin(calls).subscribe((responses) => {

      if (responses.every(response => response)) {

        this.business.CreateProduct(this.formProduct.value).subscribe((response) => {

          this.spinner.hide();

          if (!response.Error) {

            this.toast.success('Producto creado satisfactoriamente', 'Exito!');
          }

        }, (error) => {

          this.spinner.hide();

          this.toast.error('No fue posible crear el producto', 'Error!');

        });

      } else {

        this.toast.error('No fue posible cargar las imagenes', 'Error!');
      }

    });
  }

  onSave() {

    this.saveImages();
  }

}
