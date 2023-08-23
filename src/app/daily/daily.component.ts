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
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
      [
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
        { value: '', reference: undefined },
      ],
    ];
  }

  returnWordFromArray = (word: Array<any>): string => {
    let retWord: string = '';
    word.forEach((elm) => {
      retWord += elm.value;
    });
    return retWord.toUpperCase();
  };
  checkIfWordleSolved = (word: Array<any>, i: number) => {
    console.log(this.wordMatrix);

    if (this.answerWord === this.returnWordFromArray(word)) {
      console.log('CORRECT');
      return;
    }
    if (i + 1 < this.wordMatrix.length) {
      let nextWord = this.wordMatrix[i + 1][0];
      nextWord.reference.focus();
    }
  };

  test = (i: number, j: number, event: any) => {
    switch (event.inputType) {
      case 'insertText': {
        if (j + 1 < this.wordMatrix[i].length) {
          this.wordMatrix[i][j + 1].reference.focus();
        }
        break;
      }
      case 'deleteContentBackward': {
        if (j - 1 >= 0) {
          this.wordMatrix[i][j - 1].reference.focus();
        }

        break;
      }
    }
  };

  bindInputToMatrix = (htmlElm: any, word: any) => {
    word.reference = htmlElm;
  };
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
