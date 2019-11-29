import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/Customer';
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  signUpForm: FormGroup;
  customer: Customer;

  isEdit = false;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {

    this.signUpForm = this.builder.group({
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      IdentificationCardType: ['', [Validators.required]],
      IdentificationCard: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ConfPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });

    this.route.params.subscribe((params: Params) => {

      if (typeof (params.id) !== 'undefined') {

        this.isEdit = true;

        this.signUpForm.get('Password').clearValidators();
        this.signUpForm.get('ConfPassword').clearValidators();

        this.business.GetCustomerById(params.id).subscribe((response) => {

          if (!response.Error) {

            this.customer = response.Result;

            this.signUpForm.patchValue({
              FirstName: response.Result.FirstName,
              LastName: response.Result.LastName,
              Email: response.Result.Email,
              PhoneNumber: response.Result.PhoneNumber,
              IdentificationCardType: response.Result.IdentificationCardType,
              IdentificationCard: response.Result.IdentificationCard
            });
          }
        });
      }
    });

  }

  onSubmit() {

    const pass = this.signUpForm.get('Password').value;
    const confPass = this.signUpForm.get('ConfPassword').value;

    if (this.isEdit) {

      this.spinner.show();

      this.business.UpdateCustomer(this.customer.Id, this.signUpForm.value).subscribe((response) => {

        this.spinner.hide();

        if (!response.Error) {

          this.toast.success('Actualizacion Exitosa!', 'Exito!');

          this.router.navigate(['/secure/customers']);
        }

      }, (error) => {

        this.spinner.hide();

      });

    } else {
      if (pass !== confPass) {

        this.signUpForm.get('Password').setErrors({ pattern: true });
        this.signUpForm.get('ConfPassword').setErrors({ pattern: true });

        return;
      }

      this.spinner.show();

      this.business.CreateCustomer(this.signUpForm.value).subscribe((response) => {

        this.spinner.hide();

        if (!response.Error) {

          this.toast.success('Registro Exitoso!', 'Exito!');

          this.router.navigate(['/secure/customers']);
        }

      }, (error) => {

        this.spinner.hide();

      });
    }
  }

  GetPropertyValue(group: FormGroup, member: string): any {

    return group.get(member).value;
  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }

}
