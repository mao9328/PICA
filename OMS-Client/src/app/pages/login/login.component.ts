import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showModal = false;
  modalTitle = '';
  modalText = '';

  loginForm: FormGroup;

  constructor(private router: Router, private builder: FormBuilder, private business: BusinessService) { }

  ngOnInit() {

    this.loginForm = this.builder.group({
      User: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });

  }

  onClick() {

    this.business.Authenticate(this.loginForm.value).subscribe((response) => {

      if (!response.Error) {

        this.business.SetLocalStorage(environment.TokenKey, response.Result.result);

        this.router.navigate(['/secure/products']);
      } else {

        this.modalTitle = "Error";
        this.modalText = "Error, credenciales invalidas."
        this.showModal = true;
      }
    }, () => {

      this.modalTitle = "Error";
      this.modalText = "Error, credenciales invalidas."
      this.showModal = true;
      
    });
  }
}
