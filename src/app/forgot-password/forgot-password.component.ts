import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  passwordField!: string;
  userEmail: string = '';
  isUrlValidated: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: [{ value: this.userEmail, disabled: true }, [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$`
          ),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.validateConfirmPassword],
      ],
    });
    this.validateURL();
  }
  validateURL = () => {
    const token = window.location.href.split('forgotPassword/')[1];
    this.spinner.show();
    this.forgotPasswordService.validateURL(token).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.userEmail = res.body.email;
          this.isUrlValidated = true;
        } else {
          this.isUrlValidated = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isUrlValidated = false;
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };
  onPasswordFieldChange = (e: any) => {
    this.passwordField = e.target.value;
  };
  isPasswordValid = (): boolean => {
    if (
      this.resetPasswordForm.controls['password'].value.length > 0 &&
      this.resetPasswordForm.controls['password'].errors
    )
      return true;
    return false;
  };
  isConfirmPasswordValid = (): boolean => {
    if (
      this.resetPasswordForm.controls['confirmPassword'].value.length > 0 &&
      this.resetPasswordForm.controls['confirmPassword'].errors &&
      this.resetPasswordForm.controls['confirmPassword'].errors![
        'confirmPasswordError'
      ]
    )
      return true;
    return false;
  };
  validateConfirmPassword = (c: FormControl) => {
    if (c.value === this.passwordField) {
      return null;
    } else {
      return {
        confirmPasswordError: {
          message: 'Passwords do not match',
        },
      };
    }
  };
  isFormDisabled = (): boolean => {
    return !this.resetPasswordForm.valid;
  };
  onResetPasswordClick = async () => {
    this.spinner.show();
    this.forgotPasswordService
      .resetPassword(this.userEmail, this.resetPasswordForm.value.password)
      .subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: `${res.body}. Redirecting to login page!`,
            });

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          }
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
