/* Créez un programme qui affiche un rectangle dans le terminal.
*/

function isParamParse(width, height) {
  if (!width || !height)
    return false;
  if (width < 1 || height < 1)
    return false;
  if (isNaN(Number(width)) || isNaN(Number(height)))
    return false;
  else
    return true;
}

function drawRectangle(width, height) {
  const corner = 'o';
  const side = '|';
  const line = '-';
  
  let drawing = "";

  if (width == 1 && height == 1) {
    draw = corner;
  } else if (height == 1 && width > 1) {
    draw = corner + line.repeat(width - 2) + corner;
  } else if (width == 1 && height > 1) {
    draw = corner + '\n';
    for (let i = 0; i < height - 2; i++) {
      draw += side + '\n';
    }
    draw += corner;
  } else {
    draw = corner + line.repeat(width - 2) + corner + '\n';
    for (let i = 0; i < height - 2; i++) {
      draw += side + " ".repeat(width -2) + side + '\n';
    }
    draw += corner + line.repeat(width - 2) + corner + '\n';
  }
  return draw;
}

myWidth = process.argv[2];
myHeight = process.argv[3];

isParamParse(myWidth, myHeight) ? console.log(drawRectangle(myWidth, myHeight)) : console.log("Erreur: argument invalide");
