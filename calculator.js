const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b
const operate = (operator, a, b) => {
  switch(operator) {
    case '+': 
    return add(a, b)
    case '-':
      return subtract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      return divide(a, b)
  }
}

const output = document.querySelector('#output');
const log = document.querySelector('#math-log');

let resultDisplayed = false;
let a = '';
let b = '';
let operator = '';

const clearDisplay = () => {
  a = '';
  b = '';
  operator = '';
  resultDisplayed = false;
  log.innerText = '0';
  output.innerText = '0';
}

const updateDisplay = input => {
  if (resultDisplayed) {
    clearDisplay();
  }
  if (output.innerText === '0' && input !== '.') {
    output.innerText = '';
  }
  if (output.innerText.length < 16) {
    output.innerText += input;
  }
}

const updateLog = input => {
  if (log.innerText === '0') {
    log.innerText = '';
  }
  log.innerText += input;
  while (log.innerText.length > 32) {
    log.innerText = log.innerText.slice(1, log.innerText.length)
  }
}

const updateVariable = () => {
  if (a === '') {
    a = output.innerText;
    if (!log.innerText.endsWith(a + '\u00A0')) {
      updateLog(a);
    }
  } else {
    b = output.innerText;
    updateLog(b);
  }
  output.innerText = '0';
}
const getResult = () => {
  updateVariable();
  if (b === '') {
    calc = a;
  } else {
    calc = operate(operator, parseFloat(a), parseFloat(b));
  }
  output.innerText = Math.round(calc * 1000) / 1000;
  updateLog('=' + Math.round(calc * 1000) / 1000 + '\u00A0');
  resultDisplayed = true;
  a = '';
  b = '';
  operator = '';
}

const updateOperator = input => {
  if (operator !== '') {
    if (output.innerText === '0') {
      log.innerText = log.innerText.slice(0, -1);
    } else {
      getResult();
      updateVariable();
    }
  } else {
    updateVariable();
  }
  operator = input;
  resultDisplayed = false;
  updateLog(input);
}

const number = document.querySelectorAll('.number')
number.forEach(input => {
  input.addEventListener('click',  x => updateDisplay(x.target.innerText));
});

// const operators = document.querySelectorAll('.operator')
// operators.forEach(input => {
//   input.addEventListener('click', x => {
//     updateOperator(x.target.innerText)
//   });
// });



