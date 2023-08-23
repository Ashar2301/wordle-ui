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

@NgModule({
  declarations: [AppComponent, PlayComponent, DailyComponent, RandomComponent, DailyDirective],
  imports: [BrowserModule, AppRoutingModule, APP_PRIMENG_MODULE, FormsModule],
  providers: [APP_PRIMENG_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
