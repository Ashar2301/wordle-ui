import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss'],
})
export class WinModalComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  pieData: any = {};
  pieOptions: any = {};
  hoursUntilNewWordle : number = 0;
  minutesUntilNewWordle : number = 0;
  ngOnInit(): void {
    console.log(this.config.data?.attempt);
    this.pieData = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          data: [1, 1, 1, 1, 1, 1],
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
    const tomorrowDate :Date = new Date(tempTomorrowDate.getFullYear() , tempTomorrowDate.getMonth() , tempTomorrowDate.getDate());

    const timeRemaining: number =
    tomorrowDate.getTime() - currentDate.getTime();
    
    this.hoursUntilNewWordle = Math.floor(timeRemaining / (1000 * 60 * 60));
    this.minutesUntilNewWordle = Math.floor(
      (timeRemaining / (1000 * 60)) % 60
    );

  }
}
