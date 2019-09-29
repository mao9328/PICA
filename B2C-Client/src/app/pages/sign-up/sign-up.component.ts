import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Address } from 'src/app/model/Address';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  addressForm: FormGroup;

  constructor(private builder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.signUpForm = this.builder.group({
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ConfPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      Addresses: this.builder.array([])
    });

    this.addressForm = this.builder.group({
      Country: ['', [Validators.required]],
      State: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      City: ['', [Validators.required]],
      ZIP: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Street: ['', [Validators.required]]
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

  GetAddresses(): FormArray {

    return this.signUpForm.get('Addresses') as FormArray;
  }

  pushAddress() {

    (this.signUpForm.get('Addresses') as FormArray).push(this.setAddress(this.addressForm.value));

    this.addressForm.reset();
  }

  setAddress(data: Address): FormGroup {

    return this.builder.group({
      City: [data.City],
      Country: [data.Country],
      Street: [data.Street],
      ZIP: [data.ZIP],
      State: [data.State]
    });
  }

  someAddresses(): boolean {
    return (this.signUpForm.get('Addresses') as FormArray).length > 0;
  }

  deleteAddressAt(index: number) {
    (this.signUpForm.get('Addresses') as FormArray).removeAt(index);
  }
}
