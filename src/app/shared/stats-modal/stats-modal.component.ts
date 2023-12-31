import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlayService } from 'src/app/play/play.service';
import { SharedService } from '../shared.service';
import { IStatisticsObject } from '../interfaces/stats.model';
import { GameType } from '../interfaces/enums/game-types.model';

@Component({
  selector: 'app-stats-modal',
  templateUrl: './stats-modal.component.html',
  styleUrls: ['./stats-modal.component.scss'],
  providers: [DialogService, MessageService],
})
export class StatsModalComponent implements OnInit {
  answerWord: string = '';
  pieData: any = {};
  pieOptions: any = {};
  hoursUntilNewWordle: number = 0;
  minutesUntilNewWordle: number = 0;
  gameType: string = '';
  showAnswerWord: boolean = false;
  showFooter: boolean = false;
  gameObject: any;
  userRandomStats: IStatisticsObject = {};
  userDailyStats: IStatisticsObject = {};
  userStats:any;

  tabs:any[] = [
    {label : 'Daily' , command : (event:any)=> { this.userStats = this.userDailyStats ; this.configurePieChart();}},
    {label : 'Random', command : (event:any)=> { this.userStats = this.userRandomStats ; this.configurePieChart()}},
  ]
  activeTab:any = 'Daily'
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router,
    public dialogService: DialogService,
    private playService: PlayService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.showAnswerWord = this.config.data.showAnswerWord
      ? this.config.data.showAnswerWord
      : false;
    this.showFooter = this.config.data.showFooter
      ? this.config.data.showFooter
      : false;
    this.gameObject = this.config.data.gameObject;
    this.gameType = this.config.data.gameType;
    // this.showFooter = true;
    // this.gameType = 'DAILY'
    if (this.gameType === GameType.DAILY) {
      this.getDailyStats();
      if (this.showAnswerWord) this.getAnswerWordDaily();
    } else if (this.gameType === GameType.RANDOM) {
      this.getRandomStats();
      if (this.showAnswerWord) this.getAnswerWordRandom();
    }
    else{
      this.getRandomStats();
      this.getDailyStats();
    }
    const currentDate: Date = new Date();
    const tempTomorrowDate: Date = new Date(
      currentDate.getTime() + 24 * 60 * 60 * 1000
    );
    const tomorrowDate: Date = new Date(
      tempTomorrowDate.getFullYear(),
      tempTomorrowDate.getMonth(),
      tempTomorrowDate.getDate()
    );

    const timeRemaining: number =
      tomorrowDate.getTime() - currentDate.getTime();

    this.hoursUntilNewWordle = Math.floor(timeRemaining / (1000 * 60 * 60));
    this.minutesUntilNewWordle = Math.floor((timeRemaining / (1000 * 60)) % 60);
  }
  getDailyStats = () => {
    this.spinner.show();
    this.playService.returnStats(GameType.DAILY).subscribe({
      next: (res: HttpResponse<IStatisticsObject>) => {
        this.userDailyStats = res.body!;
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
        this.userStats = this.userDailyStats;
        this.configurePieChart();
        this.spinner.hide();
      },
    });
  };
  getRandomStats = () => {
    this.spinner.show();
    this.playService.returnStats(GameType.RANDOM).subscribe({
      next: (res: HttpResponse<IStatisticsObject>) => {
        this.userRandomStats = res.body!;
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
        this.userStats = this.userRandomStats;
        this.configurePieChart();
        this.spinner.hide();
      },
    });
  };

  getAnswerWordDaily = () => {
    this.spinner.show();
    this.playService.returnAnswerWord(GameType.DAILY, this.gameObject._id).subscribe({
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
      },
    });
  };
  getAnswerWordRandom = () => {
    this.spinner.show();
    this.playService.returnAnswerWord(GameType.RANDOM, this.gameObject._id).subscribe({
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
      },
    });
  };

  configurePieChart = () => {
    this.pieData = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          data: this.userStats.guessDistribution,
          backgroundColor: [
            '#071426',
            '#003F59',
            '#00717C',
            '#00A385',
            '#82D279',
            '#F9F871',
          ],
          hoverBackgroundColor: [
            '#071426',
            '#003F59',
            '#00717C',
            '#00A385',
            '#82D279',
            '#F9F871',
          ],
        },
      ],
    };

    this.pieOptions = {
      plugins: {
        legend: {
          position: 'left',
          label: {
            padding: '30',
          },
        },
      },
    };
  };
  onCloseClick = () => {
    this.ref.close();
  };
  navigateToRandomGames = () => {
    if (this.gameType === GameType.RANDOM) window.location.reload();
    else this.router.navigate(['/play/random']);
  };
  isMobileScreen(): boolean {
    return this.sharedService.isMobileScreen();
  }
}
