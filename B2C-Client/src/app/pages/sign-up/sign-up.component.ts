import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Address } from 'src/app/model/Address';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  addressForm: FormGroup;

  constructor(
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
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      IdentificationCardType: ['', [Validators.required]],
      IdentificationCard: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ConfPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }

  onSubmit() {

    const pass = this.signUpForm.get('Password').value;
    const confPass = this.signUpForm.get('ConfPassword').value;

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

        this.router.navigate(['/login']);
      }

    }, (error) => {

      this.spinner.hide();

    });

  }

  GetPropertyValue(group: FormGroup, member: string): any {

    return group.get(member).value;
  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }
}
