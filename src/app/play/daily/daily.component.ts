import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { WinModalComponent } from 'src/app/shared/win-modal/win-modal.component';
import { PlayService } from '../play.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers: [DialogService, MessageService],
})
export class DailyComponent implements OnInit, OnChanges {
  gameObject: any;
  userDailyStats: any;
  constructor(
    public dialogService: DialogService,
    private playService: PlayService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.generateDailyGame();
  }

  generateDailyGame = () => {
    this.spinner.show();
    this.playService.generateGame('daily').subscribe({
      next: (res: HttpResponse<any>) => {
        this.gameObject = res.body;
        this.gameObject.type = 'daily';
        console.log(res.body);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  getDailyStats = () => {
    this.spinner.show();
    this.playService.returnStats('daily').subscribe({
      next: (res: HttpResponse<any>) => {
        this.userDailyStats = res.body;
        console.log(res.body);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
      complete: () => {
        this.spinner.hide();
        this.showWinModal();
      },
    });
  };
  evaluateResult = (result: boolean) => {
    if (result) {
      this.getDailyStats();
    }
  };
  showWinModal() {
    const ref = this.dialogService.open(WinModalComponent, {
      header: 'Congratulations',
      width: '70vw',
      height: '80vh',
      data: this.userDailyStats,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
