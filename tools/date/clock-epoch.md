---
layout: default
parent: date
grand_parent: tools
title: "epoch clock with milliseconds"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"
custom-css-list:
    - "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    
---

<style>
      #body-bg {
        background-color: black;
        color: white;
        font-size: 5em;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 1em;
        background-color: transparent;
        color: white;
        border: none;
        cursor: pointer;
      }
      .fullscreen-icon {
        font-size: 0.3em;
      }
      #time {
		font-family: monospace;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      #timer-toggle {
        left: 10px;
             bottom: 10px;
              font-size: 0.3em;

      }
    </style>
    
    <div id="body-bg">
    <div id="time"></div>
    <button id="timer-toggle" onclick="toggleTimer()">Pause</button>
    <button onclick="toggleFullScreen()"><i class="fas fa-expand fullscreen-icon"></i></button>
    </div>
    <script>
 var intervalId;
      var isTimerRunning = true;

      function updateTime() {
        var epochTime = new Date().getTime();
        document.getElementById("time").textContent = epochTime;
      }

      function startTimer() {
        intervalId = setInterval(updateTime, 1);
      }

      function stopTimer() {
        clearInterval(intervalId);
      }

      function toggleTimer() {
        if (isTimerRunning) {
          stopTimer();
          document.getElementById("timer-toggle").textContent = "Run";
        } else {
          startTimer();
          document.getElementById("timer-toggle").textContent = "Pause";
        }
        isTimerRunning = !isTimerRunning;
      }

      startTimer();

      function toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    </script>
