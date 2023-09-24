import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { FormsModule } from '@angular/forms';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { WinModalComponent } from './shared/win-modal/win-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, APP_PRIMENG_MODULE, FormsModule , DynamicDialogModule , BrowserAnimationsModule , HttpClientModule ,NgxSpinnerModule],
  providers: [APP_PRIMENG_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
