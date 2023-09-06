import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { WinModalComponent } from 'src/app/shared/win-modal/win-modal.component';
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers: [DialogService],
})
export class DailyComponent implements OnInit, OnChanges {
  answerWord: string = 'SALET';
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void 
  {
  }

  evaluateResult=(result:boolean)=>{
    if(result)
    {
      this.showWinModal();
    }
  }
  showWinModal() {
    const ref = this.dialogService.open(WinModalComponent, {
      header: 'Congratulations',
      width: '70vw',
      height: '80vh',
      data: {
        attempt: 4,
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
