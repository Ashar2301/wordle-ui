import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!window.location.href.includes('forgotPassword')) {
      this.isAlreadyAuthenticated();
    }
  }
  isAlreadyAuthenticated = () => {
    this.authService.isAuthenticated().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.router.navigate(['/play']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  };
}
