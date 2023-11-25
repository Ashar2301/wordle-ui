import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { WinModalComponent } from 'src/app/shared/win-modal/win-modal.component';
import { PlayService } from '../play.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { LoseModalComponent } from 'src/app/shared/lose-modal/lose-modal.component';
@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
  providers: [DialogService, MessageService],
})
export class RandomComponent implements OnInit, OnChanges {
  constructor(
    public dialogService: DialogService,
    private playService: PlayService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}
  gameObject: any;
  userRandomStats: any;
  answerWord: string = '';
  ngOnInit(): void {
    this.generateRandomGame();
    // this.showLoseModal();
  }
  generateRandomGame = () => {
    this.spinner.show();
    this.playService.generateGame('random').subscribe({
      next: (res: HttpResponse<any>) => {
        this.gameObject = res.body;
        this.gameObject.type = 'random';
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
  getRandomStats = (result: boolean) => {
    this.spinner.show();
    this.playService.returnStats('random').subscribe({
      next: (res: HttpResponse<any>) => {
        this.userRandomStats = res.body;
        this.userRandomStats.gameType = 'RANDOM'
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
        if (result) this.showWinModal();
        else
          (this.userRandomStats.answerWord = this.answerWord),
            this.showLoseModal();
      },
    });
  };

  getAnswerWord = (result: boolean) => {
    this.spinner.show();
    this.playService.returnAnswerWord('RANDOM', this.gameObject._id).subscribe({
      next: (res: HttpResponse<any>) => {
        this.answerWord = res.body;
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
      data: this.userRandomStats,
    });
  }
  showLoseModal() {
    const ref = this.dialogService.open(LoseModalComponent, {
      header: 'Unlucky',
      width: '70vw',
      height: '80vh',
      data: this.userRandomStats,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
