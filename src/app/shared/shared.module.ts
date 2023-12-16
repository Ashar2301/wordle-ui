import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { StatsModalComponent } from './stats-modal/stats-modal.component';
import { WordleComponent } from './wordle/wordle.component';
import { WordleDirective } from './wordle/wordle.directive';

@NgModule({
  declarations: [
    WordleComponent,
    WordleDirective,
    LoaderComponent,
    HeaderComponent,
    StatsModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    APP_PRIMENG_MODULE,
    NgxSpinnerModule,
    AvatarModule
  ]
  ,exports:[
    WordleComponent,
    LoaderComponent,
    HeaderComponent,
    AvatarModule
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class SharedModule { }
