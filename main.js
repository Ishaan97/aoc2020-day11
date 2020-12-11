const readFile = require('fs').readFileSync

const INPUTS = [];
readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    row = data.trim().split();
    row = row[0].split("");
    INPUTS.push(row);
});

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

const ROWS = INPUTS.length;
const COLS = INPUTS[0].length
// console.log(INPUTS)

function generateDirections(){
    // [
    //     { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
    //     { row: 0, col: -1 }, { row: 0, col: 1 },
    //     { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    // ]
    let neighbors = [];
    let row = -1;
    while (row <= 1){
        let col =-1;
        while(col <=1){
            if(row!==0 || col !==0){
                neighbors.push({row, col})
            }
            col++;
        }
        row++;
    }
    return neighbors;
}


// let grid = [...INPUTS];
// console.table(grid);

function simulateGeneration(grid){
    // FOR PART 1 and PART 2. CHANGE IN THIS FUNCTION. 
    let next = [];
    for(let i=0;i<grid.length;i++){
        let row = [];
        for(let j=0;j<grid[i].length;j++){
            row.push(0);
        }
        next.push(row);
    }
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            let state = grid[i][j];

            // let occupied = countOcuppiedNeighborsPart1(grid, i, j); // PART 1
            let occupied = countOcuppiedNeighborsPart2(grid, i, j); // PART 2
  
            if(state === EMPTY && occupied===0){
                next[i][j] = OCCUPIED;
            }
            else if(state===OCCUPIED && occupied >=5){ 
                // occupied >=4 --> PART 1
                // occupied >=5 --> PART 2
                next[i][j] = EMPTY
            }
            else{
                next[i][j] = grid[i][j]
            }
        }
        
    }
    // console.table(next)
    return [...next];

}

function countOcuppiedNeighborsPart1(grid, row, col){
    const directions = generateDirections();
    let occupied = 0;
    for(let dir of directions){
        let r = dir.row + row;
        let c = dir.col + col;
        
        if(r >=0 && r< grid.length && c >=0 && c < grid[r].length){
            let endState = grid[r][c];

            if(endState === OCCUPIED){
                occupied++;
            }
        }
    }
    return occupied;
}

function countOcuppiedNeighborsPart2(grid, row, col){
    const directions = generateDirections();
    let occupied = 0;
    
    for(let d of directions){
        for(let i =1; i< grid.length; i++){
            
            endRow = row + d.row*i;
            endCol = col + d.col*i;

            if(endRow >=0 && endRow < grid.length && endCol>=0 && endCol < grid[row].length){
                endState = grid[endRow][endCol];
                
                if(endState === OCCUPIED){
                    occupied++;
                    break;
                }else if(endState === EMPTY){
                    break;
                }
            }
            else{
                break;
            }
        }
    }
    return occupied;
}

function isArrayEqual(array1, array2){
    for(let i=0;i<array1.length;i++){
        for(let j=0;j<array1[i].length;j++){
            if(array1[i][j]!== array2[i][j]){
                return false;
            }
        }
    }
    return true;
}


function simulateAll(grid){

    let run = true;
    
    let newState ;
    while(run){
        newState = simulateGeneration(grid);
        let result = isArrayEqual(grid, newState);
        run = !result;
        grid = [...newState];
    }
    // OCCUPIED IN THE END
    let occupied = 0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            if(grid[i][j] === OCCUPIED){
                occupied++;
            }
        }
    }
    console.log(occupied)
     
}

simulateAll(INPUTS)