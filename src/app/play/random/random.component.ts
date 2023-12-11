import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PlayService } from '../play.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { StatsModalComponent } from 'src/app/shared/stats-modal/stats-modal.component';
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
  ngOnInit(): void {
    this.generateRandomGame();
  }
  generateRandomGame = () => {
    this.spinner.show();
    this.playService.generateGame('random').subscribe({
      next: (res: HttpResponse<any>) => {
        this.gameObject = res.body;
        this.gameObject.type = 'random';
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
  evaluateResult = (result: boolean) => {
    if (result) {
      this.showWinModal();
    } else {
      this.showLoseModal();
    }
  };
  showWinModal() {
    const ref = this.dialogService.open(StatsModalComponent, {
      header: 'Congratulations',
      width: '80vw',
      height: '80vh',
      data: {
        gameObject: this.gameObject,
        gameType: 'RANDOM',
        showFooter: true,
      },
    });
  }
  showLoseModal() {
    const ref = this.dialogService.open(StatsModalComponent, {
      header: 'Unlucky',
      width: '90vw',
      height: '90vh',
      data: {
        gameObject: this.gameObject,
        gameType: 'RANDOM',
        showFooter: true,
        showAnswerWord: true,
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
