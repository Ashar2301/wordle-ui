import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinModalComponent } from './win-modal/win-modal.component';
import { WordleComponent } from './wordle/wordle.component';
import { FormsModule } from '@angular/forms';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { WordleDirective } from './wordle/wordle.directive';

@NgModule({
  declarations: [
    WinModalComponent,
    WordleComponent,
    WordleDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    APP_PRIMENG_MODULE
  ]
  ,exports:[
    WordleComponent
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class SharedModule { }
