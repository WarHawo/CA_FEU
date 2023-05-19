/** programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé. */

function calcExpression(str) {
  const opPriority = {
    "%": 2,
    "/": 2,
    "*": 2,
    "-": 1,
    "+": 1
  };
  str = str.replace(/\s/g, '');
  const tokens = str.match(/(\d+|\%|\/|\*|\-|\+|\(|\))/g);
  const outQueue = [];
  const opStack = [];

  for (let i = 0; i < tokens.length; i++) {
    let current = tokens[i];
    
    if (!isNaN(current)) {
      outQueue.push(Number(current));
    } else if (current in opPriority) {
      while (opStack.length > 0 && opStack[opStack.length - 1] !== '(' && opPriority[opStack[opStack.length - 1]] >= opPriority[current]) {
        outQueue.push(opStack.pop());
      }
      opStack.push(current);
    } else if (current === '(') {
      opStack.push(current);
    } else if (current === ')') {
      while (opStack[opStack.length - 1] !== '(') {
        outQueue.push(opStack.pop());
      }
      if (opStack[opStack.length - 1] === '(') {
        opStack.pop();
      }
    }
  }

  while (opStack.length > 0) {
    outQueue.push(opStack.pop());
  }

  const resultStack = [];
  for (let i = 0; i < outQueue.length; i++) {
    let current = outQueue[i];
    if (typeof current === 'number') {
      resultStack.push(current);
    } else if (current in opPriority) {
      const term2 = resultStack.pop();
      const term1 = resultStack.pop();
      let result = doOp(current, term1, term2);
      resultStack.push(result);
    }
  }
  return resultStack.pop();
}

function doOp(op, term1, term2) {
  switch(op){
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

function main() {
  const myStr = process.argv[2];
  console.log(calcExpression(myStr));
}

main();
