/* programme qui affiche un rectangle */

function drawRectangle(width, height) {
  const side = '|';
  const line = '-';
  const space = ' ';
  const border = 'o';
  
  let drawing;

  if (width == 1 && height == 1) {
    drawing = border;
  } else if (width > 1 && height == 1) {
    drawing = border + line.repeat(width - 2) + border;
  } else if (width == 1 && height > 1) {
    drawing = border + '\n';
    for (let i = 0; i < height - 2; i++) {
      drawing += side + '\n';
    }
    drawing += border;
  } else {
    drawing = border + line.repeat(width - 2) + border + '\n';
    for (let i = 0; i < height - 2; i++) {
      drawing += side + space.repeat(width - 2) + side + '\n';
    }
    drawing += border + line.repeat(width - 2) + border ;
  }
  return drawing;
}

function isParsed(width, height) {
  return (!width || !height) ? false : (isNaN(Number(width)) || isNaN(Number(width))) ? false : (width < 1 || height < 1) ? false : true;
}

myWidth = process.argv[2];
myHeight = process.argv[3];

isParsed(myWidth, myHeight) ? console.log(drawRectangle(myWidth, myHeight)) : console.log("Erreur: arguments");