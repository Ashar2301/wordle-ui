import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    APP_PRIMENG_MODULE,
    ForgotPasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class ForgotPasswordModule {}
