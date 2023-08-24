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

  test = (i: number, j: number, event: any) => {
    console.log(event);

    console.log('cl', i, j, event.key);

    if (this.wordMatrix[i][j].value.length > 1) {
      if (j + 1 < this.wordMatrix[i].length) {
        this.wordMatrix[i][j + 1].value = event.data;
        this.wordMatrix[i][j + 1].reference.focus();
        this.wordMatrix[i][j].value = this.wordMatrix[i][j].value.slice(0, 1);
        this.wordMatrix[i][j].reference.value = this.wordMatrix[i][j].value;
        return;
      } else {
        this.wordMatrix[i][j].value = this.wordMatrix[i][j].value.slice(0, 1);
        this.wordMatrix[i][j].reference.value = this.wordMatrix[i][j].value;
        return;
      }
    }

    this.wordMatrix[i][j].value = event.data;

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
  backspaceClickCheck = (i: number, j: number, event: any) => {
    console.log('backspc', i, j, this.wordMatrix[i][j].value?.length);
    // event.stopPropagation();
    // if (this.wordMatrix[i][j].value?.length === 0) {
    //   console.log('backspc');
    //   if (j - 1 >= 0) {
    //     console.log('backspc');
    //     this.wordMatrix[i][j - 1].reference.focus();
    //     event.stopPropagation();
    //     return;
    //   }
    // }
  };
  bindInputToMatrix = (htmlElm: any, word: any) => {
    word.reference = htmlElm;
  };
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
