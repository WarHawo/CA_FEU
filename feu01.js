function calculate(str) {
  const operatorPrecedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2
  };

  const tokens = str.match(/(\d+|\+|\-|\*|\/|\%|\(|\))/g);
  const outputQueue = [];
  const operatorStack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNaN(token)) {
      outputQueue.push(Number(token));
    } else if (token in operatorPrecedence) {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(" &&
        operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]) {
        outputQueue.push(operatorStack.pop());
      }

      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop());
      }

      if (operatorStack[operatorStack.length - 1] === "(") {
        operatorStack.pop();
      }
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  const operandStack = [];

  for (let i = 0; i < outputQueue.length; i++) {
    const token = outputQueue[i];

    if (typeof token === "number") {
      operandStack.push(token);
    } else if (token in operatorPrecedence) {
      const term2 = operandStack.pop();
      const term1 = operandStack.pop();

      let result;
      switch (token) {
        case "+":
          result = term1 + term2;
          break;
        case "-":
          result = term1 - term2;
          break;
        case "*":
          result = term1 * term2;
          break;
        case "/":
          result = term1 / term2;
          break;
        case "%":
          result = term1 % term2;
          break;
      }

      operandStack.push(result);
    }
  }

  return operandStack.pop();
}

console.log(calculate("1 + 3 * 2")); // expected output: 
