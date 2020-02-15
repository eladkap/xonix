class Cell{
    constructor(x, y, row, col, size, backcolor, thickness, bordercolor){
        this.pos = createVector(x, y);
        this.cpos = createVector(x + size / 2, y + size / 2);
        this.row = row;
        this.col = col;
        this.size = size;
        this.r = size / 2;
        this.backcolor = backcolor;
        this.thickness = thickness;
        this.bordercolor = bordercolor;
        this.empty = true;
        this.marked = false;
        this.visited = false;
        this.index = 0;
    }

    draw(){
        strokeWeight(this.thickness);
        stroke(this.bordercolor);     
        if (this.marked){
            fill(GRAY1);
        }
        else if (this.empty){
            fill(BLACK1);
        }
        else{
            fill(this.backcolor);
        }
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    setBackcolor(backcolor){
        this.backcolor = backcolor;
    }

    isEmpty(){
        return this.empty;
    }

    setEmpty(value){
        this.empty = value;
    }

    isMarked(){
        return this.marked;
    }

    setMarked(value){
        this.marked = value;
    }

    isVisited(){
        return this.visited;
    }

    setVisited(value){
        this.visited = value;
    }

    hasEnemy(enemy){
        let d = this.pos.dist(enemy.pos);
        return d < this.r + enemy.r;
    }
}