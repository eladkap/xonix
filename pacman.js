class Pacman{
  constructor(x, y, r, speed, backcolor){
    this.pos = createVector(x, y);
    this.cpos = createVector(x + r, y + r);
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
    this.pos.add(this.velocity);
  }

  goRight(){
    this.velocity.set(this.speed, 0);
  }

  goLeft(){
    this.velocity.set(-this.speed, 0);
  }

  goUp(){
    this.velocity.set(0, -this.speed);
  }

  goDown(){
    this.velocity.set(0, this.speed);
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
