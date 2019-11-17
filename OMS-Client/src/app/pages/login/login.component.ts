import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  private redirectTo: string;

  loginForm: FormGroup;

  constructor(private router: Router, private builder: FormBuilder, private business: BusinessService, private route: ActivatedRoute, ) { }

  ngOnInit() {

    this.loginForm = this.builder.group({
      User: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });

    this.route.queryParamMap.subscribe((route) => {

      if (route.get('retUrl') != null) {
        this.redirectTo = route.get('retUrl');
      }
    });

  }

  onClick() {

    this.business.Authenticate(this.loginForm.value).subscribe((response) => {

      if (!response.Error) {

        this.business.SetLocalStorage(environment.TokenKey, response.Result.result);

        if (this.redirectTo != null) {

          this.router.navigate([this.redirectTo]);
        } else {

          this.router.navigate(['/secure/products']);
        }

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
