---
layout: default
parent: date
grand_parent: tools
title: "epoch timer in milliseconds"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js" 
---

# Epoch timer
<style>
#clockbg {
  position: relative;
  background-color:#1d1d1d;
  width: 100%;
  height: 200px;
}
#clock {
  color: #ddd;
  font: small-caps lighter 60px/150%  'Courier New', monospace;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

</style>

<div id="clockbg"  onclick="toggleTimer()"><div id="clock"><span id="epoch">000</span></div></div>

<button id="timer-toggle" onclick="toggleTimer()" class="btn btn-green">Freeze</button>
<button onclick="openFullscreen();" class="btn btn-green">Full-screen</button>


<p style='text-align: justify;'>
Epoch time, also known as Unix time or POSIX time, represents the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC (Coordinated Universal Time). This system is widely used in computing to track time in a simple, continuous, and platform-independent manner. Epoch time is particularly useful for time calculations, event timestamps, and synchronizing systems across different platforms.
</p>

<script>
var elem = document.getElementById("clockbg");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

var intervalId;
var isTimerRunning = true;

function updateTime() {
var epochTime = new Date().getTime();
document.getElementById("epoch").textContent = epochTime;
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
  document.getElementById("timer-toggle").textContent = "Go";
} else {
  startTimer();
  document.getElementById("timer-toggle").textContent = "Freeze";
}
isTimerRunning = !isTimerRunning;
}

startTimer();

</script>
