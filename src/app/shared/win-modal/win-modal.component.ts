import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss']
})
export class WinModalComponent implements OnInit {

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  pieData:any = {};
  ngOnInit(): void {
    console.log(this.config.data?.attempt);
    this.pieData = {
      labels: ['1','2','3','4','5','6'],
      datasets: [
          {
              data: [0, 0, 1,0, 0, 1],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
    
  }

}
