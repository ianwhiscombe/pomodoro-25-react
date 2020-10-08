import React, { useRef } from 'react';
import './App.css';

export default function App() {
  // use state to hold time left data, default start of 25 minutes. Convert minutes to seconds by multiplying by 60.
  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  const [title, setTitle] = React.useState("Hit start when ready!")

  // use state to hold value of whether timer is running or not to then display the relevant buttons.
  const [timerRunning, setTimerRunning] = React.useState(false);

  // assign defualt value of null to useRef
  const intervalRef = useRef(null);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  // helper function that adds a zero to the start of 'seconds' and 'minutes' when passed a number.
  function padTime(time) {
    return time.toString().padStart(2, "0");
  }

  // fired by the onClick handler on start button (conditional statement stops timer at 0). The result of setInterval gets assigned to the current property of intervalRef to be used by pauseTimer.
  function startTimer() {
    if (intervalRef.current !== null) return;

    setTitle('Stay in the zone');
    setTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      })
    }, 1000);
  }

  // passes the current value in intervalRef to clearInterval to pause the timer and display the current time left.
  function pauseTimer() {
    if(intervalRef.current === null)  return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle(`Keep going! Only ${minutes} minutes left`);
    setTimerRunning(false);
  }

  function resetTimer() {
    setTitle('Hit start to go again')
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimerRunning(false);
    setTimeLeft(25 * 60);
  }


  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!timerRunning && (<button onClick={startTimer}>Start</button>)}
        {timerRunning && (<button onClick={pauseTimer}>Pause</button>)}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
