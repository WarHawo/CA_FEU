/* Programme qui affiche la position de l’élément le plus en haut à gauche (dans l’ordre) d’une forme au sein d’un plateau.
 */

function readBoard(file) {
  const fs = require("fs");
  
  if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf-8");
      return data;
  } else {
    return "Error: the file doesn't exit";
    process.exit(1);
  }
}

function parseBord(file) {
  const data = readBoard(file);
  let nbLines = 1;
  
  if (data.length === 0) {
    return "Error: empty file";
    process.exit(1);
  }
  
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '\n') {
      nbLines++;
    }
  }
  
  let lines = new Array(nbLines)
  for (let i = 0; i < nbLines; i++) {
    lines[i] = new Array(1);
  }
  
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== '\n') {
      lines[j] += data[i];
    } else if (data[i] === '\n') {
      j++;
    }
  }

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length !== lines[i - 1].length) {
      return 'Error: board format incorrect'
    }
  }
  return lines;
}
myFile = process.argv[2];
console.log(parseBord(myFile));