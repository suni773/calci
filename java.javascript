// script.js
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentOperand = "";
let previousOperand = "";
let operator = null;

const updateDisplay = () => {
  display.textContent = currentOperand || "0";
};

const clear = () => {
  currentOperand = "";
  previousOperand = "";
  operator = null;
  updateDisplay();
};

const appendNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number;
  updateDisplay();
};

const chooseOperator = (op) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") calculate();
  operator = op;
  previousOperand = currentOperand;
  currentOperand = "";
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operator = null;
  previousOperand = "";
  updateDisplay();
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "number") {
      appendNumber(value);
    } else if (action === "operator") {
      chooseOperator(value);
    } else if (action === "equals") {
      calculate();
    } else if (action === "clear") {
      clear();
    } else if (action === "decimal") {
      appendNumber(value);
    }
  });
});
