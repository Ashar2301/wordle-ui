import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { WinModalComponent } from 'src/app/shared/win-modal/win-modal.component';
import { PlayService } from '../play.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
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
  ngOnInit(): void {
    this.generateRandomGame();
  }
  generateRandomGame = () => {
    this.spinner.show();
    this.playService.generateGame('random').subscribe({
      next: (res: HttpResponse<any>) => {
        this.gameObject = res.body;
        this.gameObject.type = 'random';
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
  getRandomStats = () => {
    this.spinner.show();
    this.playService.returnStats('random').subscribe({
      next: (res: HttpResponse<any>) => {
        this.userRandomStats = res.body;
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
      this.getRandomStats();
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
