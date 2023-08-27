import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { FormsModule } from '@angular/forms';
import { PlayComponent } from './play/play.component';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';
import { DailyDirective } from './daily/daily.directive';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { WinModalComponent } from './shared/win-modal/win-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, PlayComponent, DailyComponent, RandomComponent, DailyDirective, WinModalComponent],
  imports: [BrowserModule, AppRoutingModule, APP_PRIMENG_MODULE, FormsModule , DynamicDialogModule , BrowserAnimationsModule],
  providers: [APP_PRIMENG_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
