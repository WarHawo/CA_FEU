/* Programme qui affiche la position de l’élément le plus en haut à gauche (dans l’ordre) d’une forme au sein d’un plateau.
 */

function readBoardFile(file) {
  const fs = require("fs");
  
  if (fs.existsSync(file)) {
      const boardData = fs.readFileSync(file, "utf-8");
      const lines = boardData.trim().split('\n');
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].length !== lines[i - 1].length) {
          console.error("Error: the board proportions are incorrect");
          process.exit(1);
        }
      }
      return lines.map(line => line.split(''));
  } else {
    console.log("Error: the bord file doesn't exit");
    process.exit(1);
  }
}

function readShapeFile(file) {
  const fs = require("fs");
  if (fs.existsSync(file)) {
    const shapeData = fs.readFileSync(file, "utf-8");
    if (shapeData.length === 0) {
      console.log("Error the shape file souldn't be empty");
      process.exit(1);
    }
    return shapeData.trim().split('\n');
  } else {
    console.log("Error: the shape file doesn't exit");
    process.exit(1);
  }
}

function findShapeInBoard(board, shape){
  const boardHeight = board.length;
  const bordWidth = board[0].length;
  const shapeHeight = shape.length;
  const shapeWidth = shape[0].length;

  for(let row = 0; row <= boardHeight - shapeHeight; row++){
    for (let col = 0; col <= bordWidth - shapeWidth; col++) {
      let match = true;

      for (let i = 0; i < shapeHeight; i++) {
        for (let j = 0; j < shapeWidth; j++) {
          if (shape[i][j] !== ' ' && shape[i][j] !== board[row + i][col + j]) {
            match = false;
            break;
          }
        }
        if (!match) {
          break;
        }
      }
      if (match) {
        return {row, col};
      }
    }
  }
  return null;
}

function printResultBoard(board, shape, position){
  const newBoard = [...board];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      newBoard[i][j] = '-';
    }
  }

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] !== ' ') {
        newBoard[position.row + i][position.col + j] = shape[i][j]; 
      } 
    }
  }
  console.log('Trouvé !');
  console.log(`Coordonnées : ${position.row + 1},${position.col + 1}`);
  console.log(newBoard.map(row => row.join('')).join('\n'));
}

function main () {
  const bordFile = process.argv[2];
  const shapeFile = process.argv[3];

  const myBoard = readBoardFile(bordFile);
  const myShape = readShapeFile(shapeFile);

  let position = findShapeInBoard(myBoard, myShape);
  if (position)
    printResultBoard(myBoard, myShape, position);
  else
    console.log("Introuvable");
}
main();