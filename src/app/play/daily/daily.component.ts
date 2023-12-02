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
import { LoseModalComponent } from 'src/app/shared/lose-modal/lose-modal.component';
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers: [DialogService, MessageService],
})
export class DailyComponent implements OnInit, OnChanges {
  gameObject: any;
  userDailyStats: any;
  answerWord: string = '';
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
      },
      error: (err: HttpErrorResponse) => {
        this.spinner.hide();
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

  getRandomStats = (result: boolean) => {
    this.spinner.show();
    this.playService.returnStats('daily').subscribe({
      next: (res: HttpResponse<any>) => {
        this.userDailyStats = res.body;
        this.userDailyStats.gameType = 'DAILY'
      },
      error: (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
      complete: () => {
        this.spinner.hide();
        if (result) this.showWinModal();
        else
          (this.userDailyStats.answerWord = this.answerWord),
            this.showLoseModal();
      },
    });
  };

  getAnswerWord = (result: boolean) => {
    this.spinner.show();
    this.playService.returnAnswerWord('DAILY', this.gameObject._id).subscribe({
      next: (res: HttpResponse<any>) => {
        this.answerWord = res.body;
      },
      error: (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
      complete: () => {
        this.spinner.hide();
        this.getRandomStats(result);
      },
    });
  };
  evaluateResult = (result: boolean) => {
    if (result) {
      this.getRandomStats(result);
    } else {
      this.getAnswerWord(result);
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
  showLoseModal() {
    const ref = this.dialogService.open(LoseModalComponent, {
      header: 'Unlucky',
      width: '70vw',
      height: '80vh',
      data: this.userDailyStats,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
