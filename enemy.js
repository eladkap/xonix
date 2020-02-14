class Enemy{
  constructor(x, y, r, speed, backcolor){
    this.pos = createVector(x, y);
    this.cpos = createVector(x + r, y + r);
    let angle = random(PI / 2);
    this.speed = speed;
    this.velocity = p5.Vector.fromAngle(angle, ENEMY_SPEED);
    this.r = r;
    this.backcolor = backcolor;
    this.vulnerable = false;
  }

  draw(){
    noStroke();
    fill(this.backcolor);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }

  update(){
    this.pos.add(this.velocity);
    for (let frame of frames){
      if (this.collides(frame)){
        this.velocity *= -1;
      }
    }
  }

  collides(frame){
    if (this.pos.x < frame.pos.x + this.r + CELL_SIZE){
      this.velocity.x *= -1;
    }
    if (this.pos.y < frame.pos.y + this.r + CELL_SIZE){
      this.velocity.y *= -1;
    }
    if (this.pos.x > frame.pos.x + frame.w - this.r - CELL_SIZE){
      this.velocity.x *= -1;
    }
    if (this.pos.y > frame.pos.y + frame.h - this.r - CELL_SIZE){
      this.velocity.y *= -1;
    }
  }

  setBackcolor(backcolor){
    this.backcolor = backcolor;
  }

  isVulnerable(){
    return this.vulnerable;
  }

  setVulnerable(value){
    this.vulnerable = value;
  }

  setSpeed(speed){
    this.speed = speed;
  }
}
