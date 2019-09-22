import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { BusinessService } from 'src/app/services/business.service';
import { Order } from 'src/app/model/Order';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePickerDirective, DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  @ViewChild('dayPicker') datePicker: DatePickerComponent;

  order: Order;
  formCreditCard: FormGroup;
  datePickerConfig: IDatePickerConfig = {
    format: 'DD/MM/YYYY',
    disableKeypress : true
  };


  constructor(
    private business: BusinessService,
    private router: Router,
    private builder: FormBuilder) { }

  ngOnInit() {

    this.formCreditCard = this.builder.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Number: ['', [Validators.required, Validators.pattern('[0-9 ]{12}')]],
      ExpirationDate: ['', [Validators.required]],
      VerificationCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });

    this.order = new Order();

    this.order.Items = this.business.getItems();
    this.order.Price = 0;

    this.order.Items.forEach((x) => this.order.Price += x.Price * x.Quantity);
  }

  get count() {

    return this.order.Items.length;
  }

  onClick() {

    localStorage.clear();

    this.business.notifyCartToMaster();

    this.router.navigate(['/secure/home']);
  }

  getProperty(member: string) {

    return this.formCreditCard.get(member) as FormControl;
  }
}
