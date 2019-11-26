import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      User: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onClick() {

    this.spinner.show();

    this.business.Authenticate(this.loginForm.value).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.toast.success('', 'Bienvenido!');

        this.business.SetLocalStorage(environment.UserKey, this.loginForm.value.User);
        this.business.SetLocalStorage(environment.TokenKey, response.Result.result);

        this.router.navigate(['/secure/home']);
      }

    }, (error) => {

      this.spinner.hide();

      this.toast.error(error.Message, 'Error!');

    });

  }
}
