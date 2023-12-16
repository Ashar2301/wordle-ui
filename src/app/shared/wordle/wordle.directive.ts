import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appWordle]'
})
export class WordleDirective {

  @Output('appWordle') emittedEvent: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.emittedEvent.emit();
  }
  constructor() { }

}
