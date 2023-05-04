/* programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé. */

function strCalulator(str) {
  str = str.replace(/\s/g, '');
  numbers = str.split(/[\+\-\*\/\%]/);
  operations = str.split('').filter(char => '%/*-+'.includes(char));
  
  let results = numbers.map(numbers => Number(numbers));
  let currentResult;
  for (let i = 0; i < operations.length; i++) {
    let currentOp = operations[i];
    let term1 = results[i];
    let term2 = results[i + 1];
    switch(currentOp) {
      case '/':
        currentResult = term1 / term2;
        break;
      case '%':
        currentResult = term1 % term2;
        break;
      case '*':
        currentResult = term1 * term2;
        break;
      case '-':
        currentResult = term1 - term2;
        break;
      case '+':
        currentResult = term1 + term2;
        break;
    }
    results.splice(i, 2, currentResult);
    operations.splice(i, 1);
    i--;
  }
  return results[0];
}
console.log(strCalulator(" 1 + 3 * 2"));