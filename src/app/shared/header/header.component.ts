import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { StatsModalComponent } from '../stats-modal/stats-modal.component';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,
    public dialogService: DialogService,) {}
  email: string = '';
  customStyles: any = {
    backgroundColor: '#7e7e7e',
    border: '1px solid #ffffff',
    borderRadius: '50%',
    color: '#ffffff',
    cursor: 'pointer',
  };
  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail')!;
  }

  onLogoutClick = () => {
    localStorage.setItem('userEmail', '');
    this.router.navigate(['/']);
  };

  onShowStatsClick=()=>{
    const ref = this.dialogService.open(StatsModalComponent, {
      header: 'Your Statistics',
      width: '70vw',
      height: '60vh',
      data: {
        gameObject: null,
        gameType: 'BOTH',
        showFooter: false,
        showAnswerWord: false,
      },
    });
  }
}