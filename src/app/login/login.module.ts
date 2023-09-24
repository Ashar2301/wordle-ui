import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    APP_PRIMENG_MODULE,
    NgxSpinnerModule
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class LoginModule { }
