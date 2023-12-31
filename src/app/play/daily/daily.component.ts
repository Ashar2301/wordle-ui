import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StatsModalComponent } from 'src/app/shared/stats-modal/stats-modal.component';
import { PlayService } from '../play.service';
import { IDailyGames, IRandomGames } from 'src/app/shared/interfaces/games.model';
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers: [DialogService, MessageService],
})
export class DailyComponent implements OnInit, OnChanges {
  gameObject: IDailyGames = {};
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
      next: (res: HttpResponse<IRandomGames | IDailyGames>) => {
        this.gameObject = res.body!;
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
        gameType: 'DAILY',
        showFooter: true,
        showAnswerWord: true,
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
        gameType: 'DAILY',
        showFooter: true,
        showAnswerWord: true,
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
