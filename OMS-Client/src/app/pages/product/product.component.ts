import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormattedMessageChain } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { LoadImgComponent } from 'src/app/components/load-img/load-img.component';
import { Observable, forkJoin, VirtualTimeScheduler } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/Product';
import { Image } from 'src/app/model/Image';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChildren(LoadImgComponent) files !: QueryList<LoadImgComponent>;

  formProduct: FormGroup;

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

            this.product = response.Result;

            this.formProduct.patchValue({
              Id: response.Result.Id,
              Name: response.Result.Name,
              Code: response.Result.Code,
              ListPrice: response.Result.ListPrice,
              Description: response.Result.Description,
              IdCategory: response.Result.IdCategory,
              IdProducer: response.Result.IdProducer,
              IdProvider: response.Result.IdProvider,
              IsActive: response.Result.IsActive,
            });

            response.Result.Images.forEach(x => this.GetImages().push(this.setImage(x)));
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
      IdProduct: [0],
      IdOffer: [0]
    });
  }

  setImage(model: Image): FormGroup {
    return this.builder.group({
      Description: [model.Description, [Validators.required]],
      Name: [model.Name, [Validators.required]],
      IsThumbnail: [model.IsThumbnail],
      Url: [model.Url],
      IdProduct: [model.IdProduct],
      IdOffer: [model.IdOffer],
      Id: [model.Id]
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

        const product = this.formProduct.value as Product;

        if (product.Id != 0) {

          this.business.UpdateProduct(product).subscribe((response) => {

            this.spinner.hide();

            if (!response.Error) {

              this.toast.success('Producto actualizado satisfactoriamente', 'Exito!');

              this.router.navigate(['/secure/products']);
            }

          }, (error) => {

            this.spinner.hide();

            this.toast.error('No fue posible actualizar el producto', 'Error!');

          });

        } else {

          this.business.CreateProduct(product).subscribe((response) => {

            this.spinner.hide();

            if (!response.Error) {

              this.toast.success('Producto creado satisfactoriamente', 'Exito!');

              this.router.navigate(['/secure/products']);
            }

          }, (error) => {

            this.spinner.hide();

            this.toast.error('No fue posible crear el producto', 'Error!');

          });
        }

      } else {

        this.spinner.hide();

        this.toast.error('No fue posible cargar las imagenes', 'Error!');
      }

    });
  }

  onSave() {

    this.saveImages();
  }

}
