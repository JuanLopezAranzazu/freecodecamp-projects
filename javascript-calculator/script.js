const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(
  "#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine",
);

const operatorButtons = document.querySelectorAll(
  "#add, #subtract, #multiply, #divide",
);

const decimalButton = document.getElementById("decimal");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

const numberMap = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const operatorMap = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

let expression = "";
let justCalculated = false;

/* Update display */

function updateDisplay(value) {
  display.textContent = value || "0";
}

/* Numbers */

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = numberMap[button.id];

    if (justCalculated) {
      expression = "";
      justCalculated = false;
    }

    expression += number;
    expression = preventLeadingZeros(expression);
    updateDisplay(expression);
  });
});

/* Prevent multiple leading zeros */

function preventLeadingZeros(value) {
  return value.replace(/(^|[+\-*/])0+(\d)/g, "$1$2");
}

/* Operators */

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operator = operatorMap[button.id];

    if (expression === "") {
      if (operator === "-") {
        expression = "-";
        updateDisplay(expression);
      }

      return;
    }

    if (justCalculated) {
      justCalculated = false;
    }

    expression = replaceOperators(expression, operator);

    updateDisplay(expression);
  });
});

/*
  Handles consecutive operators.

  Example:

  5 + * 7

  becomes:

  5 * 7

  But:

  5 * - 5

  becomes:

  5 * -5
*/

function replaceOperators(value, newOperator) {
  const match = value.match(/([+\-*/]+)$/);

  if (!match) {
    return value + newOperator;
  }

  const operators = match[1];
  const beforeOperators = value.slice(0, -operators.length);

  /*
    A single negative sign can represent
    a negative number.
  */

  if ((operators.length === 1 && operators === "*") || operators === "/") {
    return beforeOperators + operators + newOperator;
  }

  if (operators.length === 1 && operators === "+") {
    return beforeOperators + newOperator;
  }

  if (operators.length === 1 && operators === "-") {
    return beforeOperators + newOperator;
  }

  /*
    Keep the negative sign when it represents
    a negative number.
  */

  if (
    operators.includes("-") &&
    (newOperator !== "-" || operators.length > 2)
  ) {
    const hasNegative = operators.endsWith("-");

    const baseOperators = hasNegative ? operators.slice(0, -1) : operators;

    const lastOperator = baseOperators.slice(-1);

    if (newOperator === "-") {
      return beforeOperators + lastOperator + "-";
    }

    return beforeOperators + newOperator;
  }

  return beforeOperators + newOperator;
}

/* Decimal */

decimalButton.addEventListener("click", () => {
  if (justCalculated) {
    expression = "0";
    justCalculated = false;
  }

  const currentNumber = getCurrentNumber();

  if (currentNumber.includes(".")) {
    return;
  }

  if (currentNumber === "" || currentNumber === "-") {
    expression += "0.";
  } else {
    expression += ".";
  }

  updateDisplay(expression);
});

/* Get current number */

function getCurrentNumber() {
  const match = expression.match(/(-?\d*\.?\d*)$/);

  return match ? match[1] : "";
}

/* Equals */

equalsButton.addEventListener("click", () => {
  if (!expression) {
    return;
  }

  let cleanExpression = expression;

  /*
    Remove operators accidentally left
    at the end of the expression.
  */

  cleanExpression = cleanExpression.replace(/[+*/]+$/, "");

  if (cleanExpression === "" || cleanExpression === "-") {
    return;
  }

  try {
    const result = calculate(cleanExpression);
    expression = formatResult(result);
    updateDisplay(expression);
    justCalculated = true;
  } catch (error) {
    display.textContent = "Error";
    expression = "";
  }
});

/* Calculate expression */

function calculate(value) {
  /*
    The expression has already been
    normalized, so Function evaluates
    the mathematical expression using
    normal operator precedence.
  */

  const result = Function(`"use strict"; return (${value})`)();

  if (!Number.isFinite(result)) {
    throw new Error("Invalid calculation");
  }

  return result;
}

/* Format result */

function formatResult(result) {
  /*
    Avoid floating-point artifacts such as:

    0.30000000000000004
  */

  const rounded = Number.parseFloat(result.toPrecision(12));

  return String(rounded);
}

/* Clear */

clearButton.addEventListener("click", () => {
  expression = "";
  justCalculated = false;
  updateDisplay("0");
});
