import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordField!:string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, this.validateEmail]],
      password: ['', [Validators.required , Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$`)]],
      confirmPassword: ['', [Validators.required , this.validateConfirmPassword]],
    });
  }

  onPasswordFieldChange=(e:any)=>{    
    this.passwordField = e.target.value;
  }

  validateConfirmPassword=(c:FormControl)=>{
    if(c.value === this.passwordField)
    {
      return null;
    }
    else
    {
      return {
        confirmPasswordError:{
          message : 'Passwords do not match'
        }
      }
    }
  }
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
  isFormDisabled = (): boolean => {
    return !this.signupForm.valid;
  };
  isNameValid=():boolean=>{
    if (
      this.signupForm.controls['name'].value.length > 0 &&
      this.signupForm.controls['name'].errors 
    )
      return true;
    return false;
  }
  isEmailValid = (): boolean => {
    if (
      this.signupForm.controls['email'].value.length > 0 &&
      this.signupForm.controls['email'].errors &&
      this.signupForm.controls['email'].errors!['emailError']
    )
      return true;
    return false;
  };
  isPasswordValid = (): boolean => {
    if (
      this.signupForm.controls['password'].value.length > 0 &&
      this.signupForm.controls['password'].errors 
    )
      return true;
    return false;
  };
  isConfirmPasswordValid = (): boolean => {
    if (
      this.signupForm.controls['confirmPassword'].value.length > 0 &&
      this.signupForm.controls['confirmPassword'].errors &&
      this.signupForm.controls['confirmPassword'].errors!['confirmPasswordError']
    )
      return true;
    return false;
  };
  onSignupSubmit=async()=>{
    this.spinner.show();
    this.loginService.signUpUser(this.signupForm.value).subscribe({
      next: (res: HttpResponse<String>) => {
        this.spinner.hide();
        this.router.navigate(['/'])
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error})
        this.spinner.hide();
      },
    });
  }
}
