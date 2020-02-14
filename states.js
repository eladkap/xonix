class States{
    constructor(x, y, w, h, backcolor){
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.lives = 3;
        this.score = 0;
        this.progress = 0;
        this.backcolor = backcolor;
    }

    draw(){
        noStroke();
        fill(this.backcolor);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        textSize(STATES_FONT_SIZE);
        textFont(STATES_FONT_FAMILY);
        textAlign(CENTER);
        textStyle(NORMAL);
        fill(YELLOW);
        text('Lives: ' + this.lives, this.w * 0.1, this.h / 2);
        text('Score: ' + this.score, this.w * 0.4, this.h / 2);
        text('Progress: ' + this.progress + ' / ' + '80%', this.w * 0.7, this.h / 2);
    }
}