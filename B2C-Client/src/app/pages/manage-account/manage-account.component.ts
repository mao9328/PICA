import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/model/Address';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private route: ActivatedRoute, private builder: FormBuilder, private router: Router, private business: BusinessService, private spinner: SpinnerService) { }

  ngOnInit() {

    this.signUpForm = this.builder.group({
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ConfPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });

    this.route.queryParamMap.subscribe((route) => {

      this.spinner.show();

      if (route.get('id') != null) {

        this.business.GetCustomer(parseInt(route.get('id'), 10)).subscribe((response) => {

          this.spinner.hide();

          if (!response.Error) {


          }

        }, (error) => {

          this.spinner.hide();

        });
      }
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

    this.router.navigate(['/login']);
  }

  GetPropertyValue(group: FormGroup, member: string): any {

    return group.get(member).value;
  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }

}
