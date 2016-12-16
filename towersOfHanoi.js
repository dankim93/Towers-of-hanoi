
//
// class Clock {
//   constructor() {
//     const time = new Date();
//     this.hours = time.getHours();
//     this.minutes = time.getMinutes();
//     this.seconds = time.getSeconds();
//   }
//

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    // this.time = new Date();
    this.seconds = 0;
    this.timer = setInterval(() => {
      this.seconds += 1;
    }, 1000);

    this.stacks = [[1],[3,2],[]];
  }
}

Game.prototype.promptMove = function(callback) {
  console.log(this.stacks);
  reader.question('Where would you like to move from?',(from) => {
    let startTowerIdx = parseInt(from, 10);
    console.log(`You chose to move from tower #${startTowerIdx}`);
    reader.question('Where would you like to move to?',(to) => {
      let endTowerIdx = parseInt(to, 10);
      console.log(`You chose to move from tower #${startTowerIdx} to tower #${endTowerIdx}`);
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  let startTower = this.stacks[startTowerIdx];
  let endTower = this.stacks[endTowerIdx];
  if (startTowerIdx > 2 || endTowerIdx > 2 || startTowerIdx < 0 || endTowerIdx < 0) {
    return false;
  }
  else if (startTower.length === 0) {
    return false;
  }
  else if ((startTower[startTower.length - 1] < endTower[endTower.length - 1]) || endTower.length === 0) {
    return true;
  }
  else {
    return false;
  }
};

Game.prototype.move = function(startTowerIdx, endTowerIdx) {
  let startTower = this.stacks[startTowerIdx];
  let endTower = this.stacks[endTowerIdx];
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    let piece = startTower.pop();
    endTower.push(piece);
    return true;
  }
  else {
    return false;
  }
};

Game.prototype.print = function() {
  console.log(this.stacks);
};

Game.prototype.isWon = function() {
  if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
    return true;
  }
  return false;
};

Game.prototype.run = function(completionCallback) {
  this.promptMove((startTowerIdx, endTowerIdx) => {
    if (this.move(startTowerIdx, endTowerIdx)) {
      if (!this.isWon()){
        this.run(completionCallback);
      }
      else {
        completionCallback(this);
      }
    }
    else{
      console.log('Invalid move, loser, try again!');
      this.run(completionCallback.bind(this));
    }
  });
};

// Game.prototype.promptMove();
let congratulate = function(fun) {
  console.log("WINNER WINNER CHICKEN DINNER!!!!!!");
  console.log(`It took you ${fun.seconds} seconds to finish!`);
  clearInterval(fun.timer);
  reader.close();
};

let game = new Game();
game.run(congratulate);
// game.print();
