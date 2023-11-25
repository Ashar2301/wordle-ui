import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsInterceptorInterceptor } from '../shared/api-calls-interceptor.interceptor';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiCallsInterceptor: ApiCallsInterceptorInterceptor
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateEmail]],
      password: ['', Validators.required],
    });
    if (
      this.apiCallsInterceptor.isTokenInvalidFunction() ||
      localStorage.getItem('userEmail') === ''
    ) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Token expired. Please login again',
        });
      });
    }
  }
  loadMessage = () => {};
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
  };
}