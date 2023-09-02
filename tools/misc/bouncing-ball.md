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

let animationRunning = false; // Variable to track whether animation is running

var x=0, y=0, containerWidth, containerHeight;

// Function to initialize the ball position
function initializeBallPosition() {
const ball = document.getElementById('ball');
containerWidth = document.getElementById('stage').offsetWidth;
containerHeight = document.getElementById('stage').offsetHeight;

const centerX = containerWidth / 2 - ball.offsetWidth / 2; // Center x-coordinate
const centerY = containerHeight / 2 - ball.offsetHeight / 2; // Center y-coordinate
ball.style.transform = `translate(${centerX}px, ${centerY}px)`; // Set initial position
x=centerX;
y=centerY;
}

// Call the initializeBallPosition function after the window has loaded
window.onload = initializeBallPosition;

function toggleAnimation() {
if (animationRunning) {
animationRunning = false;
document.getElementById('toggleButton').textContent = 'Start';
} else {
animationRunning = true;
document.getElementById('toggleButton').textContent = 'Stop';
animate(); // Start the animation
}
}

function playBeep() {
// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node (a simple sound generator)
const oscillator = audioContext.createOscillator();

// Connect the oscillator to the audio context's destination (speakers)
oscillator.connect(audioContext.destination);

// Set the oscillator properties for the beep sound
oscillator.type = 'sine'; // Sine wave for a simple beep sound
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz (e.g., 1000 Hz)
oscillator.start();
// Stop the oscillator after a short duration (e.g., 0.5 seconds)
oscillator.stop(audioContext.currentTime + 0.05);
}
//const ball = document.getElementById('ball');
//const centerX = window.innerWidth / 2 - ball.offsetWidth / 2; // Center x-coordinate
//const centerY = window.innerHeight / 2 - ball.offsetHeight / 2; // Center y-coordinate
//let x = centerX; // Initial x-coordinate at the center
//let y = centerY; // Initial y-coordinate at the center
//        const beepSound = new Audio('beep.mp3'); // Replace 'beep.mp3' with the path to your beep sound file.
//        let x = 0; // Initial x-coordinate
//        let y = 0; // Initial y-coordinate
let xSpeed = 2; // Initial horizontal speed
let ySpeed = 2; // Initial vertical speed
function animate() {
if (!animationRunning) return; // Check if animation should be stopped
x += xSpeed;
y += ySpeed;
// Check for collision with the edges
if (x + ball.offsetWidth >= containerWidth || x <= 0) {
xSpeed = -xSpeed; // Reverse horizontal speed
playBeep();
ball.style.backgroundColor = 'red'; // Change the ball color to red
setTimeout(() => {
ball.style.backgroundColor = 'white'; // Restore the original ball color after 0.2 seconds
}, 200);
}
if (y + ball.offsetHeight >= containerHeight || y <= 0) {
ySpeed = -ySpeed; // Reverse vertical speed
playBeep();
ball.style.backgroundColor = 'red'; // Change the ball color to red
setTimeout(() => {
ball.style.backgroundColor = 'white'; // Restore the original ball color after 0.2 seconds
}, 150);
}
ball.style.transform = `translate(${x}px, ${y}px)`; // Move the ball
requestAnimationFrame(animate); // Repeat the animation
}
animate(); // Start the animation

</script>
