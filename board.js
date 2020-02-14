class Board{
    constructor(x, y, rows, cols){
        this.pos = createVector(x, y);
        this.rows = rows;
        this.cols = cols;
        this.w = cols * CELL_SIZE;
        this.h = rows * CELL_SIZE;
        this.grid = this.initGrid(rows, cols);
    }

    initGrid(rows, cols){
        let grid = [];
        for (let i = 0; i < rows; i++){
            let row = [];
            for (let j = 0; j < cols; j++){
                let x = this.pos.x + j * CELL_SIZE;
                let y = this.pos.y + i * CELL_SIZE;
                let cell = new Cell(x, y, CELL_SIZE, NAVY, 1, BLACK);
                row.push(cell);
            }
            grid.push(row);
        }

        // Set frame
        for (let j = 0; j < cols; j++){
            grid[0][j].setEmpty(false);
        }
        for (let j = 0; j < cols; j++){
            grid[rows - 1][j].setEmpty(false);
        }
        for (let i = 0; i < rows; i++){
            grid[i][0].setEmpty(false);
        }
        for (let i = 0; i < rows; i++){
            grid[i][cols - 1].setEmpty(false);
        }

        return grid;
    }

    draw(){
        for (let i = 0; i < this.rows; i++){          
            for (let j = 0; j < this.cols; j++){
                this.grid[i][j].draw();
            }
        }  
    }
}