import { Component, OnInit } from '@angular/core';
import { PlayService } from './play.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  constructor(private playService: PlayService, private router: Router) {}

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
}
