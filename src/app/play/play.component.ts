import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { PlayService } from './play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  constructor(
    private playService: PlayService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  randomIsHardMode: boolean = false;
  dailyIsHardMode: boolean = false;

  ngOnInit(): void {}

  setRandomHardMode = () => {
    this.playService.setRandomHardMode(this.randomIsHardMode);
    this.router.navigate(['/play/random']);
  };

  setDailyHardMode = () => {
    this.playService.setDailyHardMode(this.dailyIsHardMode);
    this.router.navigate(['/play/daily']);
  };

  isMobileScreen(): boolean {
    return this.sharedService.isMobileScreen();
  }
}
