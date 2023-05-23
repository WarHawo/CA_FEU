/* Programme qui remplace les caractères vides par des caractères plein pour représenter le plus grand carré possible sur un plateau. Le plateau sera transmis dans un fichier. La première ligne du fichier contient les informations pour lire la carte : nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.
*/

function readBoardFile(file) {
  const fs = require('fs');
  
  if (fs.existsSync(file)) {
    const boardData = fs.readFileSync(file, "utf-8");
    return boardData;
  } else {
    console.log("Error: the file doesn't exist");
    process.exit(1);
  }
}

function hasOnlyValidChar(array, emptyChar, obstacleChar) {
  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    if (elem != emptyChar && elem != obstacleChar) {
      return false;
    }
  }
  return true;
}

function parseBoard(board) {
  const lines = board.trim().split('\n');
  const infoLine = lines[0];

  let nbLines = parseInt(infoLine);
  const chars = infoLine.match(/\D/g);
  if (isNaN(nbLines) || chars.length !== 3) {
    console.log("Error: first line incorrect");
    process.exit(1);
  }

  const emptyChar = chars[0];
  const obstacleChar = chars[1];
  const fullChar = chars[2];

  lines.splice(0, 1);

  if (lines.length != nbLines) {
    console.log("Error: number of lines incorrect");
    process.exit(1);
  }
  
  for (let i = 0; i < lines.length; i++) {
    let lineLength = lines[0].length;
    if (lines[i].length !== lineLength) {
      console.log("Error: line length incorrect");
      process.exit(1);
    }
    if (!hasOnlyValidChar(lines[i], emptyChar, obstacleChar)) {
      console.log("Error: board char incorrect");
      process.exit(1);
    }
  }
  
  return { board: lines.map(line => line.split('')), empty: emptyChar, obstacle: obstacleChar, full: fullChar };
}

function findLargestSquare(board, emptyChar, obstacleChar) {
  const numRows = board.length;
  const numCols = board[0].length;
  let largestSize = 0;
  let largestRow = -1;
  let largestCol = -1;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (board[row][col] === emptyChar) {
        let size = 1;
        let isSquare = true;

        // Check if a square of larger size can be formed
        while (isSquare && size + row < numRows && size + col < numCols) {
          for (let i = row; i <= row + size; i++) {
            if (board[i][col + size] === obstacleChar) {
              isSquare = false;
              break;
            }
          }
          for (let j = col; j <= col + size; j++) {
            if (board[row + size][j] === obstacleChar) {
              isSquare = false;
              break;
            }
          }
          if (isSquare) {
            size++;
          }
        }

        // Update the largest square found
        if (size > largestSize) {
          largestSize = size;
          largestRow = row;
          largestCol = col;
        }
      }
    }
  }

  return { row: largestRow, col: largestCol, size: largestSize };
}

function fillLargestSquare(board, emptyChar, obstacleChar, fullChar) {
  const largestSquare = findLargestSquare(board, emptyChar, obstacleChar);
  const { row, col, size } = largestSquare;

  for (let i = row; i < row + size; i++) {
    for (let j = col; j < col + size; j++) {
      board[i][j] = fullChar;
    }
  }
  return board;
}

function printBoard(board) {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(''));
  }
}

function main() {

  const myBoardFile = readBoardFile(process.argv[2]);
  const myBoard = parseBoard(myBoardFile);
  const newBoard = fillLargestSquare(myBoard.board, myBoard.empty, myBoard.obstacle, myBoard.full);

  printBoard(newBoard);
}

main();