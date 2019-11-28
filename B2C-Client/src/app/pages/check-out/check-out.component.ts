import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { BusinessService } from 'src/app/services/business.service';
import { Order } from 'src/app/model/Order';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DatePickerDirective, DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  order: Order;
  formCreditCard: FormGroup;
  datePickerConfig: IDatePickerConfig = {
    format: 'DD/MM/YYYY',
    disableKeypress: true
  };

  constructor(
    private business: BusinessService,
    private router: Router,
    private builder: FormBuilder,
    private spinner: SpinnerService,
    private tooast: ToastrService) { }

  ngOnInit() {

    this.formCreditCard = this.builder.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Number: ['', [Validators.required, Validators.pattern('[0-9 ]{12}')]],
      ExpirationDate: ['', [Validators.required, Validators.pattern('[0-9]{2}\/[0-9]{2}')]],
      VerificationCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      Address: this.builder.group({
        CountryCode: ['', [Validators.required]],
        State: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        City: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        Zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Street: ['', [Validators.required]]
      })
    });

    this.order = new Order();

    this.order.Items = this.business.getItems();
    this.order.Price = 0;
    this.order.IdCustomer = parseInt(this.business.GetLocalStorage(environment.IdKey), 10);
    this.order.Items.forEach((x) => this.order.Price += x.Price * x.Quantity);

    this.spinner.show();

    this.business.GetCustomerByEmail(this.business.GetLocalStorage(environment.UserKey)).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.business.SetLocalStorage(environment.IdKey, response.Result.Id);

      }

    }, (error) => {

      this.spinner.hide();

      this.tooast.error('Se ha presentado un error consultando los datos del cliente.', 'Error');

    });

  }

  get count() {

    return this.order.Items.length;
  }

  validItems(): boolean {

    return this.order.Items.length > 0;
  }

  onClick() {

    this.spinner.show();

    this.business.notifyCartToMaster();

    this.order.Address = this.formCreditCard.get('Address').value;
    this.order.IdCustomer = this.business.GetLocalStorage(environment.IdKey);

    this.business.CreateOrder(this.order).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {


        this.router.navigate(['/secure/home']);
      }

    }, (error) => {

      this.spinner.hide();

      this.tooast.error('Se ha presentado un error en la creacion de la orden', 'Error');

    });

  }

  onCancel() {

    localStorage.clear();

    this.business.notifyCartToMaster();

    this.router.navigate(['/secure/home']);
  }

  getProperty(member: string, form?: FormGroup, ): FormControl {

    if (form != null) {

      return form.get(member) as FormControl;

    } else {

      return this.formCreditCard.get(member) as FormControl;
    }
  }

  getAddress(): FormGroup {
    return this.formCreditCard.get('Address') as FormGroup;
  }
}
