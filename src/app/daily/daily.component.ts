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
      this.colorTheLetters(i);
      let nextWord = this.wordMatrix[i + 1][0];
      nextWord.reference.focus();
    }
  };

  colorTheLetters = (i: number) => {
    this.wordMatrix[i].forEach((elm: any, index: number) => {
      switch (this.answerWord.search(elm.value.toUpperCase())) {
        case index: {
          elm.reference.style.backgroundColor = 'green';
          elm.reference.style.color = 'black';
          break;
        }
        case -1: {
          elm.reference.style.backgroundColor = 'red';
          elm.reference.style.color = 'black';
          break;
        }
        default: {
          elm.reference.style.backgroundColor = 'yellow';
          elm.reference.style.color = 'black';
          break;
        }
      }
    });
  };


  onInputChange = (i: number, j: number, event: any) => {
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      event.key === 'Backspace'
    ) {

      if (event.keyCode >= 65 && event.keyCode <= 90) {
        this.wordMatrix[i][j].value = event.key;
        this.wordMatrix[i][j].reference.value = event.key;
      }

      if (event.key === 'Backspace') {

        if(this.wordMatrix[i][j].value.length > 0 && this.wordMatrix[i][j].value !== ' ')
        {
          this.wordMatrix[i][j].value = ' ';
          this.wordMatrix[i][j].reference.value = ' ';
          return;
        }
        else if (j - 1 >= 0) {

          this.wordMatrix[i][j - 1].reference.focus();
        }
      } else {
        if (j + 1 < this.wordMatrix[i].length) {
          this.wordMatrix[i][j + 1].reference.focus();
          this.wordMatrix[i][j + 1].value = ' ';
          this.wordMatrix[i][j + 1].reference.value = ' ';
          event.stopPropagation();
        }
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
