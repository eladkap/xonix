class Cell{
    constructor(x, y, size, backcolor, thickness, bordercolor){
        this.pos = createVector(x, y);
        this.size = size;
        this.backcolor = backcolor;
        this.thickness = thickness;
        this.bordercolor = bordercolor;
        this.empty = true;
    }

    draw(){
        strokeWeight(this.thickness);
        stroke(this.bordercolor);
        if (this.empty){
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
}