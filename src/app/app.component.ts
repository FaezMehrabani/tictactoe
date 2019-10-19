import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from './Model/player';
import { Block } from './Model/block';
import { GameService } from './Services/game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {

  lock = false;
  constructor(public gameService: GameService , public snackBar: MatSnackBar ) {
  }

  newGame() {
    this.gameService.freeBlocksRemaining = 9;
    this.gameService.initBlocks();
    this.lock = false;
    this.gameService.turn = 0;
  }

  playerClick(i) {
    if ( this.gameService.blocks[i].free === false || this.lock === true ) { // If Block is already fill, don't Do anything
        return;
    }

    this.gameService.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

    if ( this.gameService.freeBlocksRemaining <= 0 ) {

        this.gameService.draw += 1;
        this.lock = true;
        this.snackBar.open('Game:', 'Draw', {
          duration: 2000,
        });
        return;
    }


    this.gameService.blocks[i].free = false;

    if ( this.gameService.turn === 0 ) { // Your Turn
        this.gameService.blocks[i].setValue('tick');

    } else { // Computer Turn
        this.gameService.blocks[i].setValue('cross');
    }

    const complete = this.gameService.blockSetComplete();

    if ( complete === false ) {
        this.changeTurn();
        return;

    } else {
        this.lock = true;
        this.snackBar.open('Winner:', 'Player ' + (this.gameService.turn + 1), {
          duration: 4000,
        });
        return;
    }
  }


  botTurn() {
    if ( this.gameService.freeBlocksRemaining <= 0 ) {
        return;
    }

    // tslint:disable-next-line:variable-name
    const bot_selected = this.gameService.figureBotMove() - 1;

    if ( this.gameService.blocks[bot_selected].free === true ) {
        this.playerClick(bot_selected);
    } else {
        this.botTurn();
        return;
    }

  }


  changeTurn() {
    const player = this.gameService.changeTurn();

    if ( player === 1 ) { // Computer Turn
        this.botTurn();

    }
  }
}
