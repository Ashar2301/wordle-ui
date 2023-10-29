import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PlayService } from 'src/app/play/play.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
const wordExists = require('word-exists');
@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
  providers: [MessageService],
})
export class WordleComponent implements OnInit {
  @Output() result = new EventEmitter<boolean>();
  @Input() answerWord: string = 'SALET';
  @Input() wordMatrix: Array<any> = [];
  @Input() gameObject: any;
  countMap: any = {};
  constructor(
    public dialogService: DialogService,
    private playService: PlayService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.gameObject);

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

    for (let i = 0; i < this.answerWord.length; i++) {
      this.countMap[this.answerWord[i]] === undefined
        ? (this.countMap[this.answerWord[i]] = 1)
        : this.countMap[this.answerWord[i]]++;
    }

    // this.showWinModal();
  }

  returnWordFromArray = (word: Array<any>): string[] => {
    let retWord: string[] = [];
    word.forEach((elm) => {
      retWord.push(elm.value);
    });
    return retWord;
  };

  isSolved = (response: string[]): boolean => {
    let flag: boolean = true;
    response.forEach((elm: string) => {
      if (elm !== 'G') flag = false;
    });

    return flag;
  };

  checkIfWordExists = (wordArr: Array<any>) => {
    let word: string = '';
    wordArr.forEach((elm) => {
      word += elm.value;
    });
    console.log(word);
    console.log(wordExists(word));

    return wordExists(word);
  };
  checkIfWordleSolved = (word: Array<any>, i: number) => {
    console.log(this.wordMatrix);

    if (!this.checkIfWordExists(word)) {

      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Word does not exist',
      });
    } else {
      const payload: any = {
        email: localStorage.getItem('userEmail'),
        gameID: this.gameObject._id,
        attempt: this.returnWordFromArray(word),
        attemptNumber: i + 1,
      };
      let response: any;
      this.playService
        .registerAttempt(payload, this.gameObject.type)
        .subscribe({
          next: (res: HttpResponse<string[]>) => {
            console.log(res);

            response = res;
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error,
            });
          },
          complete: () => {
            console.log(response);

            this.colorTheLetters(i, response);
            if (this.isSolved(response)) {
              this.result.emit(true);
            } else {
              if (i + 1 < this.wordMatrix.length) {
                let nextWord = this.wordMatrix[i + 1][0];
                nextWord.reference.focus();
              }
            }
          },
        });
    }
  };

  colorTheLetters = (i: number, colors: string[]) => {
    console.log(colors);

    this.wordMatrix[i].forEach((elm: any, index: number) => {
      switch (colors[index]) {
        case 'G': {
          elm.reference.style.backgroundColor = 'green';
          break;
        }
        case 'R': {
          elm.reference.style.backgroundColor = 'red';
          break;
        }
        case 'Y': {
          elm.reference.style.backgroundColor = 'yellow';
          break;
        }
      }
      elm.reference.style.color = 'black';
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
        if (
          this.wordMatrix[i][j].value.length > 0 &&
          this.wordMatrix[i][j].value !== ' '
        ) {
          this.wordMatrix[i][j].value = ' ';
          this.wordMatrix[i][j].reference.value = ' ';
          return;
        } else if (j - 1 >= 0) {
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
    let ind = -1;
    this.gameObject?.attempts.letters.forEach(
      (elm: string[], index: number) => {
        ind = index;
        for (let i = 0; i < elm.length; i++) {
          this.wordMatrix[index][i].value = elm[i];
        }
      }
    );
    if (ind + 1 < this.wordMatrix.length)
      this.wordMatrix[ind + 1][0].reference.focus();
    this.gameObject?.attempts.colors.forEach((elm: string[], index: number) => {
      this.colorTheLetters(index, elm);
    });
  }
}
