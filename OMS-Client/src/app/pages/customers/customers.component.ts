import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private toast: ToastrService
  ) { }

  filterForm: FormGroup;
  reclasificar: FormGroup;
  elements = 10;
  page = 0;
  total = 1;
  Customers: Customer[] = [];

  showType = false;
  showModal = false;


  ngOnInit() {

    this.filterForm = this.builder.group({
      Filter: [''],
      Criteria: [''],
      Type: ['CC']
    });

    this.reclasificar = this.builder.group({
      Type: ['1'],
      Id: [''],
      Identificacion: ['']
    });

    this.filterForm.get('Filter').valueChanges.subscribe((value) => {

      this.Customers = [];

      switch (value) {

        case 'I':

          this.showType = true;

          break;

        case 'IP':

          this.showType = false;

          break;
      }

    });

  }

  getCustomersByIdentificacion(type: string, id: string) {

    this.spinner.show();

    this.business.GetCustomerByIdentification(type, id).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.Customers = [response.Result];

        this.total = 1;
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });

  }

  getCustomersByProductId(id: string) {

    this.spinner.show();

    this.business.GetCustomerByProductId(id, this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.Customers = response.Result;
        this.total = response.Rows;

      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });

  }

  onSearch() {

    const filter = this.filterForm.get('Filter').value;
    const criteria = this.filterForm.get('Criteria').value;
    const type = this.filterForm.get('Type').value;

    switch (filter) {

      case 'IP':

        this.getCustomersByProductId(criteria);

        break;

      case 'I':

        this.getCustomersByIdentificacion(type, criteria);

        break;

    }
  }

  pageChanged(pagina) {

    this.page = pagina;

    this.onSearch();

  }

  openChangeType(model: Customer) {

    this.reclasificar.patchValue({
      Id: model.Id,
      Identificacion: model.IdentificationCard
    });

    this.showModal = true;
  }

  onChangeType() {

    this.showModal = false;

    this.spinner.show();

    this.business.UpdateTypeCustomer(this.reclasificar.value.Type, this.reclasificar.value.Id).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.toast.success('Se ha reclasificado el cliente satisfactoriamente', 'Exito!');

        this.onSearch();

      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });
  }

  onCancel() {

    this.reclasificar.reset();
    this.showModal = false;
  }

}
