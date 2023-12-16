import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { SharedModule } from '../shared/shared.module';
import { DailyComponent } from './daily/daily.component';
import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { RandomComponent } from './random/random.component';
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
