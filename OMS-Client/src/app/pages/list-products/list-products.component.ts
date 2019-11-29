import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[];

  elements = 10;
  page = 1;
  total = 1;

  showModal = false;
  formCancelar: FormGroup;
  filterForm: FormGroup;
  showCriteria = false;

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private builder: FormBuilder) { }

  ngOnInit() {

    this.formCancelar = this.builder.group({
      Id: [0]
    });

    this.filterForm = this.builder.group({
      Filter: ['T'],
      Criteria: ['']
    });

    this.filterForm.get('Filter').valueChanges.subscribe((value) => {

      this.products = [];

      switch (value) {

        case 'C':
        case 'ND':

          this.showCriteria = true;

          break;

        default:
          this.showCriteria = false;
          break;

      }

    });

  }

  loadAllProducts() {

    this.spinner.show();

    this.business.GetProducts(this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
      }
    }, () => {

      this.spinner.hide();

      this.toast.error('No ha sido posible consultar los productos', 'Error!');

    });
  }

  productsByCode(criteria: string) {

    this.spinner.show();

    this.business.GetProductsByCode(criteria, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
      }
    }, () => {

      this.spinner.hide();

      this.toast.error('No ha sido posible consultar los productos', 'Error!');

    });
  }

  productsByNameDesc(criteria: string) {

    this.spinner.show();

    this.business.GetProductsByNameOrDesc(criteria, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.products = response.Result;
      }
    }, () => {

      this.spinner.hide();

      this.toast.error('No ha sido posible consultar los productos', 'Error!');

    });
  }

  openDelete(id: number) {

    this.formCancelar.patchValue({
      Id: id
    });

    this.showModal = true;
  }

  onDeleteProduct() {

    this.showModal = false;

    this.spinner.show();

    this.business.DeleteProduct(this.formCancelar.value.Id).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.toast.success('Se ha cancelado la orden satisfactoriamente', 'Exito!');

        this.loadAllProducts();

      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });
  }

  onCancel() {

    this.formCancelar.reset();
    this.showModal = false;
  }

  onSearch() {

    const filter = this.filterForm.get('Filter').value;
    const criteria = this.filterForm.get('Criteria').value;

    switch (filter) {

      case 'T':

        this.loadAllProducts();

        break;

      case 'C':

        this.productsByCode(criteria);

        break;

      case 'ND':

        this.productsByNameDesc(criteria);

        break;
    }
  }

  pageChanged(pagina) {

    this.page = pagina;

    this.onSearch();

  }

}
