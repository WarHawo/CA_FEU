/* Créez un programme qui affiche un rectangle dans le terminal.
*/

function drawRectangle(longeur, largeur) {
    let rectangle = "";
    const cornerChar = 'o';
    const lineChar = '-';
    const sideChar = '|'

    if (longeur === 1 && largeur === 1)
        rectangle = cornerChar;
    else if (largeur == 1) {
        rectangle = cornerChar + lineChar.repeat(longeur -2) + cornerChar;

    }
    else if (longeur == 1) {
        rectangle = cornerChar + '\n';
        for (let i = 0; i < largeur - 2; i++) {
            rectangle += sideChar + '\n';
        }
        rectangle += cornerChar;

    }
    else {
        rectangle = cornerChar + lineChar.repeat(longeur -2) + cornerChar + '\n';
    for (let i = 0; i < largeur - 2; i++) {
        rectangle += sideChar + " ".repeat(longeur - 2) + sideChar +'\n';
    }
    rectangle += cornerChar + lineChar.repeat(longeur -2) + cornerChar;
    }
    

    return rectangle;
}

console.log(drawRectangle(1, 0));