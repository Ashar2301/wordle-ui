import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lose-modal',
  templateUrl: './lose-modal.component.html',
  styleUrls: ['./lose-modal.component.scss'],
})
export class LoseModalComponent implements OnInit {
  answerWord: string = '';
  pieData: any = {};
  pieOptions: any = {};
  hoursUntilNewWordle: number = 0;
  minutesUntilNewWordle: number = 0;
  userData: any = {};
  gameType: string = '';
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.config.data;
    this.answerWord = this.userData.answerWord.toUpperCase();
    this.gameType = this.userData.gameType;
    this.pieData = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          data: this.userData.guessDistribution,
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
  onCloseClick = () => {
    this.ref.close();
  };
  navigateToRandomGames = () => {
    if (this.gameType === 'RANDOM') window.location.reload();
    else this.router.navigate(['/play/random']);
  };
}
