import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setWaitingForSecondOperand(false);
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className='App'>
      <div className='calculator'>
        <div className='display'>{displayValue}</div>
        <div className='keypad'>
          <button className='keypad-btn' onClick={() => inputDigit('7')}>
            7
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('8')}>
            8
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('9')}>
            9
          </button>
          <button className='keypad-btn' onClick={() => performOperation('/')}>
            /
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('4')}>
            4
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('5')}>
            5
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('6')}>
            6
          </button>
          <button className='keypad-btn' onClick={() => performOperation('*')}>
            *
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('1')}>
            1
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('2')}>
            2
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('3')}>
            3
          </button>
          <button className='keypad-btn' onClick={() => performOperation('-')}>
            -
          </button>
          <button className='keypad-btn' onClick={() => inputDecimal()}>
            .
          </button>
          <button className='keypad-btn' onClick={() => inputDigit('0')}>
            0
          </button>
          <button className='keypad-btn' onClick={() => performOperation('=')}>
            =
          </button>
          <button className='keypad-btn' onClick={() => performOperation('+')}>
            +
          </button>
        </div>
        <button className='keypad-btn clear' onClick={() => clearDisplay()}>
          AC
        </button>
      </div>
    </div>
  );
}

export default App;
