import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../auth.service';
import { StatsModalComponent } from '../stats-modal/stats-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { IBugReport } from '../interfaces/bug,model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService,MessageService],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogService: DialogService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}
  name: string = '';
  email: string = '';
  bugFile: any;
  customStyles: any = {
    backgroundColor: '#7e7e7e',
    border: '1px solid #ffffff',
    borderRadius: '50%',
    color: '#ffffff',
    cursor: 'pointer',
  };
  reportBugForm!: FormGroup;
  showModal: boolean = false;
  ngOnInit(): void {
    let user = this.authService.returnUser();
    this.name = user?.name;
    this.email = user?.email;
    this.reportBugForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
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

  onFileUploadChange = (event: any) => {
    this.bugFile = event.target.files[0];
  };
  onUploadBugClick = () => {
    this.spinner.show();
    const payload: IBugReport = {
      description: this.reportBugForm.value.description,
      file: this.bugFile,
    };
    this.sharedService.uploadBug(payload).subscribe({
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.showModal = false;
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error,
        });
      },
      complete: () => {
        this.showModal = false;
        this.spinner.hide();
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Bug Reported Successfully',
        });
      },
    });
  };
}
