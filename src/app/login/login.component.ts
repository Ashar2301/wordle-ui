import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateEmail]],
      password: ['', Validators.required],
    });
  }

  isFormDisabled = (): boolean => {
    return !this.loginForm.valid;
  };

  isEmailValid = (): boolean => {
    if (
      this.loginForm.controls['email'].value.length > 0 &&
      this.loginForm.controls['email'].errors &&
      this.loginForm.controls['email'].errors!['emailError']
    )
      return true;
    return false;
  };

  validateEmail = (c: FormControl) => {
    let EMAIL_REGEXP =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return EMAIL_REGEXP.test(c.value)
      ? null
      : {
          emailError: {
            message: 'Email is invalid',
          },
        };
  };

  onLoginSubmit = async () => {
    this.spinner.show();
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (res: HttpResponse<any>) => {
        this.spinner.hide();
        localStorage.setItem('userEmail', this.loginForm.value.email);
        this.router.navigate(['/play']);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
    // console.log(resp);
  };
}
