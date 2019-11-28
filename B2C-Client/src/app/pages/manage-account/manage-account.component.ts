import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/model/Address';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BusinessService } from 'src/app/services/business.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/model/Customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  signUpForm: FormGroup;
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {

    this.signUpForm = this.builder.group({
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      IdentificationCardType: ['', [Validators.required]],
      IdentificationCard: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]]
    });

    this.route.queryParamMap.subscribe((route) => {

      this.spinner.show();

      this.business.GetCustomerByEmail(this.business.GetLocalStorage(environment.UserKey)).subscribe((response) => {

        this.spinner.hide();

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

      }, (error) => {

        this.spinner.hide();

        this.toast.error('Se ha presentado un error consultando el cliente.', 'Error');

        this.router.navigate(['/public/home']);

      });

    });

  }

  onSubmit() {

    const value = this.signUpForm.value;

    this.spinner.show();

    this.business.UpdateCustomer(this.customer.Id, value).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

      }

    }, (error) => {

      this.spinner.hide();
    });

    this.router.navigate(['/public/home']);
  }

  GetPropertyValue(group: FormGroup, member: string): any {

    return group.get(member).value;
  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }

}
