const breakLengthDisplay = document.getElementById("break-length");
const sessionLengthDisplay = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeftDisplay = document.getElementById("time-left");
const startStopButton = document.getElementById("start_stop");
const resetButton = document.getElementById("reset");
const beep = document.getElementById("beep");
const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");

let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let timerInterval = null;
let isRunning = false;
let currentMode = "Session";

/* Update displays */

function updateSettings() {
  breakLengthDisplay.textContent = breakLength;
  sessionLengthDisplay.textContent = sessionLength;
}

/* Format mm:ss */

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}

/* Update timer display */

function updateTimerDisplay() {
  timeLeftDisplay.textContent = formatTime(timeLeft);
}

/* Break decrement */

breakDecrement.addEventListener("click", () => {
  if (isRunning) {
    return;
  }

  if (breakLength > 1) {
    breakLength--;
  }

  updateSettings();
});

/* Break increment */

breakIncrement.addEventListener("click", () => {
  if (isRunning) {
    return;
  }

  if (breakLength < 60) {
    breakLength++;
  }

  updateSettings();
});

/* Session decrement */

sessionDecrement.addEventListener("click", () => {
  if (isRunning) {
    return;
  }

  if (sessionLength > 1) {
    sessionLength--;
  }

  if (currentMode === "Session") {
    timeLeft = sessionLength * 60;

    updateTimerDisplay();
  }

  updateSettings();
});

/* Session increment */

sessionIncrement.addEventListener("click", () => {
  if (isRunning) {
    return;
  }

  if (sessionLength < 60) {
    sessionLength++;
  }

  if (currentMode === "Session") {
    timeLeft = sessionLength * 60;

    updateTimerDisplay();
  }

  updateSettings();
});

/* Start / Stop */

startStopButton.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

/* Start */

function startTimer() {
  isRunning = true;

  startStopButton.textContent = "Pause";

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    }

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      playBeep();
      switchMode();
    }
  }, 1000);
}

/* Pause */

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  startStopButton.textContent = "Start";
}

/* Switch Session / Break */

function switchMode() {
  if (currentMode === "Session") {
    currentMode = "Break";
    timerLabel.textContent = "Break";
    timeLeft = breakLength * 60;
  } else {
    currentMode = "Session";
    timerLabel.textContent = "Session";
    timeLeft = sessionLength * 60;
  }

  updateTimerDisplay();
  isRunning = true;
  startStopButton.textContent = "Pause";

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    }

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      playBeep();
      switchMode();
    }
  }, 1000);
}

/* Play alarm */

function playBeep() {
  beep.currentTime = 0;
  beep.play().catch(() => {
    // Browser may block autoplay until user interaction.
  });
}

/* Reset */

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
  currentMode = "Session";
  breakLength = 5;
  sessionLength = 25;
  timeLeft = 25 * 60;

  timerLabel.textContent = "Session";
  startStopButton.textContent = "Start";

  beep.pause();
  beep.currentTime = 0;
  updateSettings();
  updateTimerDisplay();
});

/* Initial state */

updateSettings();

updateTimerDisplay();
