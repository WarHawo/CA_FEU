/* programme qui trouve et affiche la solution d’un Sudoku.
*/

function hasOnlyNumbersOrDot(array) {
    for (let i = 0; i < array.length; i++) {
        const elem = array[i];
        if (isNaN(Number(elem)) && elem !== '.') {
            return false;
        }
    }
    return true;
}

function readBoardFile(file) {
    const fs = require("fs");

    if (fs.existsSync(file)) {
        const boardData = fs.readFileSync(file, "utf-8");
        const lines = boardData.trim().split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length != 9) {
                console.log("Error: The sudoku board is incorrect");
                process.exit(1);
            }
            if (!hasOnlyNumbersOrDot(lines[i])) {
                console.log("Error: the values in the board are incorrect, only numbers!");
                process.exit(1);
            }
        }
        return lines.map(line => line.split(''));
    } else {
        console.log("Error: the file doesn't exit");
        process.exit(1);
    }
}

function isValidValue (board, row, col, value) {
    for (let c = 0; c < 9; c++) { 
        if (board[row][c] == value)
            return false;
    }
    for (let r = 0; r < 9; r++) {
        if (board[r][col] == value)
            return false;
    }

    //Verify bloc 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c =  startCol; c < startCol + 3; c++) {
            if (board[r][c] == value)
                return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    const size = 9;

    function solve(row, col) {
        if (row === size) {
            return true;
        }
        if (col === size) {
            return solve(row + 1, 0);
        }
        if (board[row][col] !== '.') {
            return solve(row, col + 1);
        }

        for (let val = 1; val <= size; val++) {
            if (isValidValue(board, row, col, val)) {
                board[row][col] = val;

                if (solve(row, col + 1)) {
                    return true;
                }
                board[row][col] = '.';
            }
        }
        return false;
    }
    solve (0,0);
}

function printSodoku(board) {
    const size = 9;
    for (let row = 0; row < size; row++) {
        console.log(board[row].join(''));
    }
}

function main() {
    const mySudokuFile = process.argv[2];
    let  mySudokuBoard = readBoardFile(mySudokuFile);

    solveSudoku(mySudokuBoard);
    printSodoku(mySudokuBoard);
}

main();