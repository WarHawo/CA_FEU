/* programme qui affiche un rectangle dans le terminal. */

function drawRectangle(width, height)
{
  const border = 'o';
  const side = '|';
  const line = "-";

  let drawing = '';
  
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
      drawing += side + " ".repeat(width - 2) + side + '\n';
    }
    drawing += border + line.repeat(width - 2) + border;
  }
  return drawing;
}

function isParamParse(width, height)
{
  return (!width || !height) ? false : (isNaN(Number(width)) || isNaN(Number(height))) ? false : (width < 1 || height < 1) ?  false :  true;
}

const myWidth = process.argv[2];
const myHeight = process.argv[3];

isParamParse(myWidth, myHeight) ? console.log(drawRectangle(myWidth, myHeight)) : console.log("Errreur: arguments");