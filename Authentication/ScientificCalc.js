function tokenize(expression) {
  return expression
    .replace(/\s+/g, "")
    .match(/(\d+\.?\d*|sin|cos|tan|log|ln|sqrt|[()+\-*/^])/g);
}

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3
};

function infixToPostfix(tokens) {
  let output = [];
  let stack = [];

  tokens.forEach(token => {
    if (!isNaN(token)) {
      output.push(token);
    }
    else if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(token)) {
      stack.push(token);
    }
    else if (token === "(") {
      stack.push(token);
    }
    else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
      if (stack.length && ["sin", "cos", "tan", "log", "ln", "sqrt"].includes(stack[stack.length - 1])) {
        output.push(stack.pop());
      }
    }
    else {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  let stack = [];

  postfix.forEach(token => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    }
    else if (["+", "-", "*", "/", "^"].includes(token)) {
      let b = stack.pop();
      let a = stack.pop();
      switch (token) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/": stack.push(a / b); break;
        case "^": stack.push(Math.pow(a, b)); break;
      }
    }
    else {
      let a = stack.pop();
      switch (token) {
        case "sin": stack.push(Math.sin(a * Math.PI / 180)); break;
        case "cos": stack.push(Math.cos(a * Math.PI / 180)); break;
        case "tan": stack.push(Math.tan(a * Math.PI / 180)); break;
        case "log": stack.push(Math.log10(a)); break;
        case "ln": stack.push(Math.log(a)); break;
        case "sqrt": stack.push(Math.sqrt(a)); break;
      }
    }
  });

  return stack[0];
}

function calculate(expression) {
  const tokens = tokenize(expression);
  const postfix = infixToPostfix(tokens);
  return evaluatePostfix(postfix);
}
