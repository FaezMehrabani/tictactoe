import { Injectable } from '@angular/core';
import { Player } from './../Model/Player';
import { Block } from './../Model/block';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players = [];
  turn = 0; // By Default First Player turn is First
  draw = 0;

  blocks = [];
  freeBlocksRemaining = 9;

  constructor() {
    this.initBlocks();
    this.initPlayers();
  }
  initBlocks() {
    this.blocks = [];

    for (let i = 1; i <= 9; ++i) {
        const block = new Block();

        block.free = true;
        block.value = '';
        block.symbol = '';

        this.blocks.push(block);
    }
}
initPlayers() {
  // Player1
  const player1 = new Player();
  player1.bot = false;

  // Bot
  const player2 = new Player();


  this.players.push(player1);
  this.players.push(player2);
}
changeTurn() {

  if ( this.turn === 1 ) {
      this.turn = 0;
  } else {
      this.turn = 1;
  }

  return this.turn;
}
blockSetComplete() {
  const block1 = this.blocks[0];
  const block2 = this.blocks[1];
  const block3 = this.blocks[2];
  const block4 = this.blocks[3];
  const block5 = this.blocks[4];
  const block6 = this.blocks[5];
  const block7 = this.blocks[6];
  const block8 = this.blocks[7];
  const block9 = this.blocks[8];

  if (
      (block1.free === false && block2.free === false && block3.free === false &&
         (block1.value === block2.value) && (block1.value === block3.value)) ||
      (block1.free === false && block4.free === false && block7.free === false &&
         (block1.value === block4.value) && (block1.value === block7.value)) ||
      (block1.free === false && block5.free === false && block9.free === false &&
         (block1.value === block5.value) && (block1.value === block9.value)) ||
      (block2.free === false && block5.free === false && block8.free === false &&
         (block2.value === block5.value) && (block2.value === block8.value)) ||
      (block3.free === false && block6.free === false && block9.free === false &&
         (block3.value === block6.value) && (block3.value === block9.value)) ||
      (block3.free === false && block5.free === false && block7.free === false &&
         (block3.value === block5.value) && (block3.value === block7.value)) ||
      (block4.free === false && block5.free === false && block6.free === false &&
         (block4.value === block5.value) && (block4.value === block6.value)) ||
      (block7.free === false && block8.free === false && block9.free === false &&
         (block7.value === block8.value) && (block7.value === block9.value))
  ) {
      return true;
  }


  return false;
}
figureBotMove() { // Priortize by checking block that is completing

  // tslint:disable-next-line:variable-name
  let bot_move = this.GetCompletingSet();

  if ( bot_move > 0 ) {
      return bot_move;
  }

  // 2nd Priority Block enemy from completing Set
  bot_move = this.blockEnemyAttemptCompleteSet();

  if ( bot_move > 0 ) {
      return bot_move;
  }

  return Math.floor(Math.random() * 8) + 1;
}
    /* Check if any Block Set is completing  */
   GetCompletingSet() {

    const block1 = this.blocks[0];
    const block2 = this.blocks[1];
    const block3 = this.blocks[2];
    const block4 = this.blocks[3];
    const block5 = this.blocks[4];
    const block6 = this.blocks[5];
    const block7 = this.blocks[6];
    const block8 = this.blocks[7];
    const block9 = this.blocks[8];

    // Block#1
    if ( block1.free === false && block2.free === true && block3.free === false &&
       ( block1.value === 'cross' && block1.value === block3.value) ) {
        return 2;
    } else if ( block1.free === false && block2.free === false && block3.free === true
       && ( block1.value === 'cross' && block1.value === block2.value) ) {
        return 3;
    } else if ( block1.free === false && block4.free === true && block7.free === false
       && ( block1.value === 'cross' && block1.value === block7.value) ) {
        return 4;
    } else if ( block1.free === false && block4.free === false && block7.free === true
       && ( block1.value === 'cross' && block1.value === block4.value) ) {
        return 7;
    } else if ( block1.free === false && block5.free === true && block9.free === false
       && ( block1.value === 'cross' && block1.value === block9.value) ) {
        return 5;

    } else if ( block1.free === false && block5.free === false && block9.free === true
       && ( block1.value === 'cross' && block1.value === block5.value) ) {
        return 9;
    // Block#2
    } else if ( block2.free === false && block3.free === false && block1.free === true
       && ( block2.value === 'cross' && block2.value === block3.value) ) {
        return 1;

    } else if ( block2.free === false && block8.free === false && block5.free === true
       && ( block2.value === 'cross' && block2.value === block8.value) ) {
        return 5;

    } else if ( block2.free === false && block8.free === true && block5.free === false
       && ( block2.value === 'cross' && block2.value === block5.value) ) {
        return 8;

    // Block#3
    } else if ( block3.free === false && block6.free === true && block9.free === false
       && ( block3.value === 'cross' && block3.value === block9.value) ) {
        return 6;

    } else if ( block3.free === false && block9.free === true && block6.free === false
       && ( block3.value === 'cross' && block3.value === block6.value) ) {
        return 9;

    } else if ( block3.free === false && block5.free === true && block7.free === false
       && ( block3.value === 'cross' && block3.value === block7.value) ) {
        return 5;

    } else if ( block3.free === false && block7.free === true && block5.free === false
       && ( block3.value === 'cross' && block3.value === block5.value) ) {
        return 7;

    // Block#4
    } else if ( block4.free === false && block5.free === true && block6.free === false
       && ( block4.value === 'cross' && block4.value === block6.value) ) {
        return 5;

    } else if ( block4.free === false && block6.free === true && block5.free === false
       && ( block4.value === 'cross' && block4.value === block5.value) ) {
        return 6;

    // Block#5
    } else if ( block5.free === false && block4.free === true && block6.free === false
       && ( block5.value === 'cross' && block5.value === block6.value) ) {
        return 4;

    // Block#7
    } else if ( block7.free === false && block8.free === true && block9.free === false
       && ( block7.value === 'cross' && block7.value === block9.value) ) {
        return 8;

    } else if ( block7.free === false && block9.free === true && block8.free === false
       && ( block7.value === 'cross' && block7.value === block8.value) ) {
        return 9;

    // Block#8
    } else if ( block8.free === false && block7.free === true && block9.free === false
       && ( block8.value === 'cross' && block8.value === block9.value) ) {
        return 7;

    } else { // If none is applicable
        return 0;
    }

}
/*  Block Enemy Attempt to Complete Set  */
   blockEnemyAttemptCompleteSet() {

    const block1 = this.blocks[0];
    const block2 = this.blocks[1];
    const block3 = this.blocks[2];
    const block4 = this.blocks[3];
    const block5 = this.blocks[4];
    const block6 = this.blocks[5];
    const block7 = this.blocks[6];
    const block8 = this.blocks[7];
    const block9 = this.blocks[8];


    // Block#1
    if ( block1.free === false && block2.free === true && block3.free === false
       && (block1.value === block3.value) ) {
        return 2;
    } else if ( block1.free === false && block2.free === false && block3.free === true
       && (block1.value === block2.value) ) {
        return 3;
    } else if ( block1.free === false && block4.free === true && block7.free === false
       && (block1.value === block7.value) ) {
        return 4;
    } else if ( block1.free === false && block4.free === false && block7.free === true
       && (block1.value === block4.value) ) {
        return 7;
    } else if ( block1.free === false && block5.free === true && block9.free === false
       && (block1.value === block9.value) ) {
        return 5;
    } else if ( block1.free === false && block5.free === false && block9.free === true
       && (block1.value === block5.value) ) {
        return 9;
    // Block#2
    } else if ( block2.free === false && block3.free === false && block1.free === true
       && (block2.value === block3.value) ) {
        return 1;

    } else if ( block2.free === false && block8.free === false && block5.free === true
       && (block2.value === block8.value) ) {
        return 5;

    } else if ( block2.free === false && block8.free === true && block5.free === false
       && (block2.value === block5.value) ) {
        return 8;

    // Block#3
    } else if ( block3.free === false && block6.free === true && block9.free === false
       && (block3.value === block9.value) ) {
        return 6;

    } else if ( block3.free === false && block9.free === true && block6.free === false
       && (block3.value === block6.value) ) {
        return 9;

    } else if ( block3.free === false && block5.free === true && block7.free === false
       && (block3.value === block7.value) ) {
        return 5;

    } else if ( block3.free === false && block7.free === true && block5.free === false
       && (block3.value === block5.value) ) {
        return 7;

    // Block#4
    } else if ( block4.free === false && block5.free === true && block6.free === false
       && (block4.value === block6.value) ) {
        return 5;

    } else if ( block4.free === false && block6.free === true && block5.free === false
       && (block4.value === block5.value) ) {
        return 6;

    // Block#5
    } else if ( block5.free === false && block4.free === true && block6.free === false
       && (block5.value === block6.value) ) {
        return 4;

    // Block#7
    } else if ( block7.free === false && block8.free === true && block9.free === false
       && (block7.value === block9.value) ) {
        return 8;

    } else if ( block7.free === false && block9.free === true && block8.free === false
       && (block7.value === block8.value) ) {
        return 9;

    // Block#8
    } else if ( block8.free === false && block7.free === true && block9.free === false
       && (block8.value === block9.value) ) {
        return 7;

    } else { // If none is applicable
        return 0;
    }
}

}
