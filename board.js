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
                let cell = new Cell(x, y, i, j, CELL_SIZE, NAVY, 1, BLACK);
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

    at(row, col){
        return this.grid[row][col];
    }

    areaCovered(){
        let totalArea = this.rows * this.cols;
        let cellsCovered = 0;
        for (let i = 0; i < this.rows; i++){          
            for (let j = 0; j < this.cols; j++){
                if (!this.grid[i][j].isEmpty()){
                    cellsCovered++;
                }
            }
        }
        return int(cellsCovered / totalArea * 100);
    }

    setAllVisited(value){
        for (let i = 0; i < this.rows; i++){          
            for (let j = 0; j < this.cols; j++){
                this.grid[i][j].setVisited(value);
            }
        }
    }

    setAreaEmpty(area, value){
        for (let cell of area){
            cell.setEmpty(value);
        }
    }

    areaContainsEnemies(area, enemies){
        for (let enemy of enemies){
            for (let cell of area){
                if (cell.hasEnemy(enemy)){
                    return true;
                }
            }
        }
        return false;
    }

    scan(){
        let colors = [RED, GREEN, PURPLE, ORANGE];
        let areaIndex = 0;
        this.setAllVisited(false);
        for (let i = 0; i < this.rows; i++){          
            for (let j = 0; j < this.cols; j++){
                let cell = this.grid[i][j];
                if (!cell.isVisited() && cell.isEmpty()){
                    let area = this.dfsIterative(i, j, colors[areaIndex]);               
                    if (!this.areaContainsEnemies(area, enemies)){
                        this.setAreaEmpty(area, false);
                    }
                    areaIndex++;
                    if (areaIndex >= colors.length){
                        areaIndex = 0;
                    }
                }
            }
        }
        console.log("Areas scanned: " + areaIndex);
    }

    dfs(row, col, clr){
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols){
            return;
        }
         
        let cell = this.grid[row][col];
        if (cell.isVisited() || !cell.isEmpty()){
            return;
        }
        cell.setVisited(true);
        cell.setBackcolor(clr);

        this.dfs(row+1, col, clr);
        this.dfs(row-1, col, clr);
        this.dfs(row, col+1, clr);
        this.dfs(row, col-1, clr);
    }

    dfsIterative(row, col, clr){
        let area = [];
        let stack = [];
        let cell = this.grid[row][col]
        stack.push(cell);
        while (stack.length > 0){
            let cell = stack.pop();
            cell.setVisited(true);
            //cell.setBackcolor(clr);
            area.push(cell);
            let row = cell.row;
            let col = cell.col;
            if (row + 1 < this.rows && !this.grid[row + 1][col].isVisited() && this.grid[row + 1][col].isEmpty()){
                stack.push(this.grid[row + 1][col]);
                //this.grid[row + 1][col].setBackcolor(clr);
            }
            if (row - 1 >= 0 && !this.grid[row - 1][col].isVisited() && this.grid[row - 1][col].isEmpty()){
                stack.push(this.grid[row - 1][col]);
                //this.grid[row - 1][col].setBackcolor(clr);
            }
            if (col + 1 < this.cols && !this.grid[row][col + 1].isVisited() && this.grid[row][col + 1].isEmpty()){
                stack.push(this.grid[row][col + 1]);
                //this.grid[row][col + 1].setBackcolor(clr);
            }
            if (col - 1 >= 0 && !this.grid[row][col - 1].isVisited() && this.grid[row][col - 1].isEmpty()){
                stack.push(this.grid[row][col - 1]);
                //this.grid[row][col - 1].setBackcolor(clr);
            }
        }
        return area;
    }
}