import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiCallsInterceptorInterceptor } from './shared/api-calls-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_PRIMENG_MODULE,
    FormsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    APP_PRIMENG_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiCallsInterceptorInterceptor,
      multi: true,
    },
    ApiCallsInterceptorInterceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
