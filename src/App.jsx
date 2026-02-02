import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue * -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="bg-gray-800 rounded-2xl p-6 mb-4 text-right">
          <div className="text-5xl font-light text-white break-words">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={clear}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            +/-
          </button>
          <button
            onClick={handlePercentage}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            %
          </button>
          <button
            onClick={() => performOperation('/')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            ÷
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('*')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            ×
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('-')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            −
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('+')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            +
          </button>

          <button
            onClick={() => inputDigit(0)}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-orange-500 hover:bg-orange-400 text-white text-xl font-semibold rounded-2xl p-6 transition-all active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;