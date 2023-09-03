---
layout: default
parent: misc
grand_parent: tools
title: "bouncing ball"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"
---

# bouncing ball
<style>

    #ball {
        width: 100px;
        height: 100px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
    }
    #stage {
        position: relative;
        background-color:#1d1d1d;
        width: 100%;
        height: 200px;
    }

</style>

<div id="stage"><div id="ball"></div></div>
<button id="toggleButton" onclick="toggleAnimation();" class="btn btn-green float-right">Start</button>
<button onclick="openFullscreen();" class="btn btn-green float-right">Full-screen</button>

<script>
function openFullscreen() {
var elem = document.getElementById("stage");
if (elem.requestFullscreen) {
elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Safari */
elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE11 */
elem.msRequestFullscreen();
}
}

let animationRunning = false; 
var x=0, y=0, containerWidth, containerHeight;

function initializeBallPosition() {
const ball = document.getElementById('ball');
containerWidth = document.getElementById('stage').offsetWidth;
containerHeight = document.getElementById('stage').offsetHeight;

const centerX = containerWidth / 2 - ball.offsetWidth / 2; 
const centerY = containerHeight / 2 - ball.offsetHeight / 2; 
ball.style.transform = `translate(${centerX}px, ${centerY}px)`; 
x=centerX;
y=centerY;
}

window.onload = initializeBallPosition;

function toggleAnimation() {
if (animationRunning) {
animationRunning = false;
document.getElementById('toggleButton').textContent = 'Start';
} else {
animationRunning = true;
document.getElementById('toggleButton').textContent = 'Stop';
animate(); 
}
}

function playBeep() {
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
oscillator.connect(audioContext.destination);
oscillator.type = 'sine'; 
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
oscillator.start();
oscillator.stop(audioContext.currentTime + 0.05);
}
let xSpeed = 2;
let ySpeed = 2;
function animate() {
if (!animationRunning) return;
x += xSpeed;
y += ySpeed;
if (x + ball.offsetWidth >= containerWidth || x <= 0) {
xSpeed = -xSpeed;
playBeep();
ball.style.backgroundColor = 'red';
setTimeout(() => {
ball.style.backgroundColor = 'white';
}, 200);
}
if (y + ball.offsetHeight >= containerHeight || y <= 0) {
ySpeed = -ySpeed;
playBeep();
ball.style.backgroundColor = 'red';
setTimeout(() => {
ball.style.backgroundColor = 'white';
}, 150);
}
ball.style.transform = `translate(${x}px, ${y}px)`; 
requestAnimationFrame(animate);
}
animate(); 
</script>
