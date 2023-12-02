import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}
  @Input() message: string = 'Loading';
  @Input() bdColor: string = 'rgba(0, 0, 0, 0.8)';
  @Input() color: string = '#fff';
  @Input() fullScreen: boolean = true;
  ngOnInit(): void {}
}
