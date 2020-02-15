class Pacman{
  constructor(x, y, r, speed, backcolor){
    this.pos = createVector(x, y);
    this.cpos = createVector(x + r, y + r);
    this.row = 0;
    this.col = 0
    this.velocity = createVector(0, 0);
    this.speed = speed;
    this.r = r;
    this.backcolor = backcolor;
    this.isMoving = false;
    this.movingCount = 0;
  }

  draw(){
    noStroke();
    fill(this.backcolor);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }

  update(){
    //this.pos.add(this.velocity);
    //this.verifyInsideBoard();
    let cell = board.at(this.row, this.col);
    if (cell.isEmpty()){
      cell.setMarked(true);
      markedCells.push(cell);
    }
    else{
      if (markedCells.length > 0){
        for (let cell of markedCells){
          cell.setMarked(false);
          cell.setEmpty(false);
        }
        markedCells = [];
        states.progress = board.areaCovered();
        board.scan();
      }
    }
  }

  verifyInsideBoard(){
    if (this.pos.x < board.pos.x){
      this.pos.x = board.pos.x + this.r;
    }
    if (this.pos.x > board.pos.x + board.w){
      this.pos.x = board.pos.x + board.w - this.r;
    }
    if (this.pos.y < board.pos.y){
      this.pos.y = board.pos.y + this.r;
    }
    if (this.pos.y > board.pos.y + board.h){
      this.pos.y = board.pos.y + board.h - this.r;
    }
  }

  goRight(){
    if (this.col + 1 < board.cols){
      this.col++;
      //this.velocity.set(this.speed, 0);
      this.pos.x += this.speed;
    }
  }

  goLeft(){
    if (this.col - 1 >= 0){
      this.col--;
      //this.velocity.set(-this.speed, 0);
      this.pos.x -= this.speed;
    }
  }

  goUp(){
    if (this.row - 1 >= 0){
      this.row--;
      //this.velocity.set(0, -this.speed);
      this.pos.y -= this.speed;
    }
  }

  goDown(){
    if (this.row + 1 < board.rows){
      this.row++;
      //this.velocity.set(0, this.speed);
      this.pos.y += this.speed;
    }
  }

  stop(){
    this.velocity.set(0, 0);
  }

  isInsideRect(rectangle){
    let condX = this.pos.x >= rectangle.pos.x && this.pos.x <= rectangle.pos.x + rectangle.w;
    let condY = this.pos.y >= rectangle.pos.y && this.pos.y <= rectangle.pos.y + rectangle.h;
    return condX && condY;
  }

  onBoardFrame(frame){
     let lineCond1 =  this.pos.x == frame.pos.x && this.pos.y >= field.pos.y && this.pos.y <= field.pos.y + field.h;
     let lineCond2 =  this.pos.x == frame.pos.x + frame.w && this.pos.y >= field.pos.y && this.pos.y <= field.pos.y + field.h;
     let lineCond3 =  this.pos.y == frame.pos.y && this.pos.x >= field.pos.x && this.pos.x <= field.pos.x + field.w;
     let lineCond4 =  this.pos.y == frame.pos.y + frame.h && this.pos.x >= field.pos.x && this.pos.x <= field.pos.x + field.w;
     return lineCond1 || lineCond2 || lineCond3 || lineCond4;
  }

  collides(enemy){
    let d = this.pos.dist(enemy.pos);
    return d < this.r + enemy.r;
  }

  setSpeed(speed){
    this.speed = speed;
  }
}
