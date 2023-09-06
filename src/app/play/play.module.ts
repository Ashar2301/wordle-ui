import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { FormsModule } from '@angular/forms';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    PlayComponent,
    DailyComponent,
    RandomComponent,
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule,
    APP_PRIMENG_MODULE,
    SharedModule
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class PlayModule { }
