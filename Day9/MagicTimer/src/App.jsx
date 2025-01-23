import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null); // Ref for the text box
  const timerRef = useRef(null); // Ref for the timer ID
  const [timer, setTimer] = useState(10); // Timer value
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [isDisabled, setIsDisabled] = useState(false); // Input box disabled state

  React.useEffect(() => {
    inputRef.current.focus(); // Automatically focus the input box on page load
  }, []);

  const handleFocusBox = () => {
    inputRef.current.focus(); // Refocus the text box
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsDisabled(false); // Enable the input box
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsDisabled(true); // Disable the input box
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleStopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    clearInterval(timerRef.current);
    setTimer(10);
    setIsRunning(false);
    setIsDisabled(false); // Enable the input box again
  };

  return (
    <div className="app-container">
      <h1>Magical Timer and Input Box</h1>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          className="text-box"
          disabled={isDisabled} // Disable input box when timer is 0
        />
      </div>
      <div>
        <h1 className={timer === 0 ? 'red-text' : ''}>
          {timer === 0 ? "Time's Up!" : timer}
        </h1>
        <button onClick={handleStartTimer} disabled={isRunning}>Start Timer</button>
        <button onClick={handleStopTimer}>Stop Timer</button>
        <button onClick={handleResetTimer}>Reset Timer</button>
      </div>
    </div>
  );
}

export default App;
