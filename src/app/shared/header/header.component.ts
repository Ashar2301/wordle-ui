import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../auth.service';
import { StatsModalComponent } from '../stats-modal/stats-modal.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogService: DialogService,
    private authService: AuthService,
  ) {}
  name: string = '';
  customStyles: any = {
    backgroundColor: '#7e7e7e',
    border: '1px solid #ffffff',
    borderRadius: '50%',
    color: '#ffffff',
    cursor: 'pointer',
  };
  ngOnInit(): void {
    let user = this.authService.returnUser();
    this.name = user?.name;
  }

  onLogoutClick = () => {
    this.authService.logout();
    this.router.navigate(['/']);
  };

  onShowStatsClick = () => {
    const ref = this.dialogService.open(StatsModalComponent, {
      header: 'Your Statistics',
      width: '90vw',
      height: '90vh',
      data: {
        gameObject: null,
        gameType: 'BOTH',
        showFooter: false,
        showAnswerWord: false,
      },
    });
  };
}
