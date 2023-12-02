import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_PRIMENG_MODULE, APP_PRIMENG_PROVIDERS } from 'primeng.import';
import { LoaderComponent } from './loader/loader.component';
import { LoseModalComponent } from './lose-modal/lose-modal.component';
import { WinModalComponent } from './win-modal/win-modal.component';
import { WordleComponent } from './wordle/wordle.component';
import { WordleDirective } from './wordle/wordle.directive';

@NgModule({
  declarations: [
    WinModalComponent,
    WordleComponent,
    WordleDirective,
    LoseModalComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    APP_PRIMENG_MODULE,
    NgxSpinnerModule
  ]
  ,exports:[
    WordleComponent,
    LoaderComponent
  ],
  providers: [APP_PRIMENG_PROVIDERS],
})
export class SharedModule { }
