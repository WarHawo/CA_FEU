function calculatrice(expression) {
  expression = expression.replace(/\s/g, '');
  let terms = expression.split(/[\+\-\*\/\%]/);
  let operation = expression.split('').filter(char => '/*-+%'.includes(char));
  let result = terms.map(term => Number(term));
  for (let i = 0; i < operation.length ; i++) {
    let op = operation[i];
    let term1 = result[i];
    let term2 = result[i + 1];
    let output;
    switch(op) {
      case '+':
        output = term1 + term2;
        break;
      case '-':
        output = term1 - term2;
        break;
      case '*':
        output = term1 * term2;
        break;
      case '/':
        output = term1 / term2;
        break;
      case '%':
        output = term1 % term2;
        break;
    }
    result.splice(i, 2, output);
    operation.splice(i, 1);
    i--;
  }
  return result[0];
}

myExpr = process.argv[2];

console.log(calculatrice(myExpr));