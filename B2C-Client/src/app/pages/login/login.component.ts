import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private builder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      UserName: ['', Validators.required],
      Pass: ['', Validators.required]
    });
  }

  onClick() {

    console.log(this.loginForm.value);

    this.router.navigate(['/secure/home']);
  }
}
