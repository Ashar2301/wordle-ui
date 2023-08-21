import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit, OnChanges {
  answerWord: string = 'SALET';
  @Input() wordMatrix: Array<any> = [];
  constructor() {}

  ngOnInit(): void {
    this.wordMatrix = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
  }

  checkIfWordleSolved = (word : Array<string>) => {
    if (
      this.answerWord === word.toString().split(',').join('').toUpperCase()
    ) {
      console.log('CORRECT');
      return;
    }
  };

  test=(currentInput : any)=>{
    if(currentInput.value.length > 0 && currentInput.nextSibling)
    {
      currentInput.nextSibling.focus();
    }
    else if((currentInput.value === "" || currentInput.value === null) && currentInput.previousSibling)
    {
      currentInput.previousSibling.focus();
    }   
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
