/** programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé. */

function calcExpression (str) {
  const operatorPriority = {
    "%": 2,
    "/": 2,
    "*": 2,
    "-": 1,
    "+": 1
  };
  
  const tokens = str.match(/[\d\(\)\%\/\*\-\+]/g);
  const operatorStack = [];
  const outputQueue = [];

  for (let i = 0; i < tokens.length ; i++) {
    const current = tokens[i];
    
    if (!isNaN(current)) {
      outputQueue.push(Number(current));
    } else if (current in operatorPriority) {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(" && operatorPriority[operatorStack[operatorStack.length - 1]] >= operatorPriority[current]) {
        outputQueue.push(operatorStack.pop());
      }  
      operatorStack.push(current);
    } else if (current === '(') {
      operatorStack.push(current);
    } else if (current === ')') {
      while (operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop());
      }
      if (operatorStack[operatorStack.length - 1] === '(') {
        operatorStack.pop();
      }
    }
  }
  
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  let operandStack = [];

  for (let i =0; i < outputQueue.length; i++) {
    const current = outputQueue[i];
    if (typeof current === "number") {
      operandStack.push(current);
    } else if (current in operatorPriority) {
      const term2 = operandStack.pop();
      const term1 = operandStack.pop();
      let result = doOperation(current, term1, term2);
      operandStack.push(result);
    }
  }
  return operandStack.pop();
}

function doOperation(op, term1, term2) {
  switch(op)
    {
      case '%':
        return term1 % term2;
      case '/':
        return term1 / term2;
      case '*':
        return term1 * term2;
      case '-':
        return term1 - term2;
      case '+':
        return term1 + term2;
    }
}

let myStr = process.argv[2];

console.log(calcExpression(myStr));