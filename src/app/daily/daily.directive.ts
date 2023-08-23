import { Directive, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appDaily]',
})
export class DailyDirective implements OnInit {
  @Output('appDaily') emittedEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.emittedEvent.emit();
  }
  constructor() {}
}
