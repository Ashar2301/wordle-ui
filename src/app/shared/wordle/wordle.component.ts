import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PlayService } from 'src/app/play/play.service';
import { SharedService } from '../shared.service';
const wordExists = require('word-exists');
@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
  providers: [MessageService],
})
export class WordleComponent implements OnInit {
  @Output() result = new EventEmitter<boolean>();
  @Input() wordMatrix: Array<any> = [];
  @Input() gameObject: any;
  isGameOver: boolean = false;
  isHardMode: boolean = false;
  hardModeCache: any = {
    green: [],
    red: [],
    yellow: [],
  };
  constructor(
    public dialogService: DialogService,
    private playService: PlayService,
    private messageService: MessageService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
  ) {}

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

    // this.showWinModal();
  }

  returnWordFromArray = (word: Array<any>): string[] => {
    let retWord: string[] = [];
    word.forEach((elm) => {
      retWord.push(elm.value.toLowerCase());
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
    // return true;
    let word: string = '';
    wordArr.forEach((elm) => {
      if (elm.value !== ' ' && elm.value !== '')
        word += elm.value.toLowerCase();
    });
    if (word.length !== 5) return false;
    if (
      !wordExists(word) &&
      !this.sharedService.checkIfWordExistsInLocalDictionary(word)
    )
      return false;
    return true;
  };
  checkIfWordleSolved = (word: Array<any>, i: number) => {
    this.spinner.show();
    this.isHardMode = this.gameObject?.hardMode;
    if (!this.checkIfWordExists(word)) {
      this.spinner.hide();
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Word does not exist',
      });
    } else {
      if (this.isHardMode && i !== 0) {
        let flag: boolean = true;
        let hint: string = '';
        for (let i = 0; i < word.length; i++) {
          if (this.hardModeCache.red.includes(word[i].value)) {
            flag = false;
            hint = `Word should not contain ${word[i].value.toUpperCase()}`;
            break;
          }
          if (
            this.hardModeCache.green.indexOf(word[i].value) !== i &&
            this.hardModeCache.green.indexOf(word[i].value.toUpperCase()) !== -1
          ) {
            flag = false;
            hint = `letter should be ${word[i].value}`;
            if (i == 0) hint = 'First ' + hint;
            else if (i == 1) hint = 'Second ' + hint;
            else if (i == 2) hint = 'Third ' + hint;
            else if (i == 3) hint = 'Forth ' + hint;
            else if (i == 4) hint = 'Fifth ' + hint;
            break;
          }
        }
        if (!flag) {
          this.spinner.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: hint,
          });
          return;
        }
        //yellow case
        for (let i = 0; i < this.hardModeCache.yellow.length; i++) {
          let flag2: boolean = false;
          for (let j = 0; j < word.length; j++) {
            if (word[j].value === this.hardModeCache.yellow[i]) {
              flag2 = true;
              break;
            }
          }
          if (!flag2) {
            flag = false;
            hint = `Word should contain ${this.hardModeCache.yellow[
              i
            ].toUpperCase()}`;
          }
        }
        if (!flag) {
          this.spinner.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: hint,
          });
          return;
        }
      }
      const payload: any = {
        gameID: this.gameObject._id,
        attempt: this.returnWordFromArray(word),
        attemptNumber: i + 1,
      };
      let response: any;
      this.playService
        .registerAttempt(payload, this.gameObject.type)
        .subscribe({
          next: (res: HttpResponse<string[]>) => {
            response = res;
          },
          error: (err: HttpErrorResponse) => {
            this.spinner.hide();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error,
            });
          },
          complete: () => {
            this.spinner.hide();
            this.colorTheLetters(i, response);
            this.colorTheKeyboardLetters(payload.attempt, response);
            if (this.isSolved(response)) {
              this.isGameOver = true;
              this.result.emit(true);
            } else {
              if (this.isHardMode) {
                response.forEach((elm: string, index: number) => {
                  if (elm === 'R') {
                    this.hardModeCache.red.push(payload.attempt[index]);
                  } else if (elm === 'G') {
                    this.hardModeCache.green[index] = payload.attempt[index];
                  } else if (elm === 'Y') {
                    this.hardModeCache.yellow.push(payload.attempt[index]);
                  }
                });
              }
              if (i + 1 < this.wordMatrix.length) {
                let nextWord = this.wordMatrix[i + 1][0];
                nextWord.reference.focus();
              } else {
                this.isGameOver = true;
                this.result.emit(false);
              }
            }
          },
        });
    }
  };

  colorTheKeyboardLetters = (attempt: string[], response: string[]) => {
    attempt.forEach((elm: string, index: number) => {
      let id = elm + '-btn';
      let button = document.getElementById(id);
      if (!button?.classList.contains('p-button-success')) {
        switch (response[index]) {
          case 'R': {
            button?.classList.add('p-button-danger');
            button?.classList.remove('p-button-success');
            button?.classList.remove('p-button-warning');
            break;
          }
          case 'G': {
            button?.classList.add('p-button-success');
            button?.classList.remove('p-button-warning');
            button?.classList.remove('p-button-danger');
            break;
          }
          case 'Y': {
            button?.classList.add('p-button-warning');
            button?.classList.remove('p-button-success');
            button?.classList.remove('p-button-danger');
            break;
          }
        }
      }
    });
  };
  colorTheLetters = (i: number, colors: string[]) => {
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
          this.wordMatrix[i][j].value?.length > 0 &&
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

  onMouseDown = (event: any) => {
    event.preventDefault();
  };

  onVirtualKeyboardClick = (key: string, keyCode: number) => {
    const coordinates: any = this.returnMatrixCoordinates();

    const stopPropagation = () => {};
    const event = { key, keyCode, stopPropagation };

    if (key === 'Backspace') {
      if (coordinates.i === 6 && coordinates.j === 5) {
        this.wordMatrix[coordinates.i - 1][coordinates.j - 1].value = ' ';
        this.wordMatrix[coordinates.i - 1][coordinates.j - 1].reference.value =
          ' ';
        coordinates.i--;
        coordinates.j--;
      } else if (
        coordinates.j === 0 &&
        coordinates.i === 0 &&
        (this.wordMatrix[coordinates.i][coordinates.j].value === '' ||
          this.wordMatrix[coordinates.i][coordinates.j].value === ' ')
      ) {
        return;
      } else if (
        coordinates.j === 0 &&
        (this.wordMatrix[coordinates.i][coordinates.j].value === '' ||
          this.wordMatrix[coordinates.i][coordinates.j].value === ' ') &&
        coordinates.i != 0
      ) {
        this.wordMatrix[coordinates.i - 1][4].value = ' ';
        this.wordMatrix[coordinates.i - 1][4].reference.value = ' ';
        coordinates.i = coordinates.i - 1;
        coordinates.j = 4;
      } else {
        this.wordMatrix[coordinates.i][coordinates.j - 1].value = ' ';
        this.wordMatrix[coordinates.i][coordinates.j - 1].reference.value = ' ';
      }
    } else if (key === 'Enter') {
      if (coordinates.j !== 0 && coordinates.i !== 6 && coordinates.j !== 5)
        return;
      this.checkIfWordleSolved(
        this.wordMatrix[coordinates.i - 1],
        coordinates.i - 1
      );
    }
    this.onInputChange(coordinates.i, coordinates.j, event);
  };

  returnMatrixCoordinates = (): any => {
    let i = 0,
      j = 0;
    for (i = 0; i < this.wordMatrix.length; i++) {
      for (j = 0; j < this.wordMatrix[i].length; j++) {
        if (
          this.wordMatrix[i][j].value === '' ||
          this.wordMatrix[i][j].value === ' '
        ) {
          return { i, j };
        }
      }
    }
    return { i, j };
  };
  ngOnChanges(changes: SimpleChanges): void {
    let ind = -1;
    this.gameObject?.attempts?.letters?.forEach(
      (elm: string[], index: number) => {
        ind = index;
        for (let i = 0; i < elm.length; i++) {
          this.wordMatrix[index][i].value = elm[i];
        }
      }
    );
    if (ind + 1 < this.wordMatrix.length)
      this.wordMatrix[ind + 1][0].reference.focus();
    this.gameObject?.attempts?.colors?.forEach((elm: string[], index: number) => {
      this.colorTheLetters(index, elm);
    });
  }
  isMobileScreen(): boolean {
    return this.sharedService.isMobileScreen();
  }
}
