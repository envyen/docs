---
layout: default
parent: misc
grand_parent: tools
title: "Clock Angle calculator"
---

# Clock Angle calculator

<style>
#angle-result {
font-size: 20px;
margin-top: 20px;
}
#clock {
margin-top: 20px;
}
</style>

<label for="timeInput">Select a time:</label>
<input type="time" id="timeInput" value="12:00" step="1">

<button onclick="calculateAngles()">Calculate Angles</button>

<div id="angle-result"></div>

<div id="clock"></div>


<script>


function calculateAngles() {
const timeInput = document.getElementById('timeInput');
const angleResult = document.getElementById('angle-result');
const clockDiv = document.getElementById('clock');

const selectedTime = timeInput.value;
const timeArray = selectedTime.split(':');
const hours = parseInt(timeArray[0]);
const minutes = parseInt(timeArray[1]);
const seconds = parseInt(timeArray[2]) || 0; // Default seconds to 0 if not provided

const hourAngle = 0.5 * (60 * hours + minutes);
const minuteAngle = 6 * minutes;
const secondAngle = 6 * seconds;

let angleHourMinute = Math.abs(hourAngle - minuteAngle);
angleHourMinute = Math.min(360 - angleHourMinute, angleHourMinute);

let angleHourSecond = Math.abs(hourAngle - secondAngle);
angleHourSecond = Math.min(360 - angleHourSecond, angleHourSecond);

let angleMinuteSecond = Math.abs(minuteAngle - secondAngle);
angleMinuteSecond = Math.min(360 - angleMinuteSecond, angleMinuteSecond);

angleResult.innerHTML = `
Angle between hour and minute needles: ${angleHourMinute} degrees.<br>
Angle between hour and second needles: ${angleHourSecond} degrees.<br>
Angle between minute and second needles: ${angleMinuteSecond} degrees.
`;

drawClock(hours, minutes, seconds, clockDiv);
}

function drawClock(hours, minutes, seconds, container) {
const clockSVG = `
<svg height="200" width="200">
<circle cx="100" cy="100" r="90" stroke="black" stroke-width="4" fill="white" />
${drawNeedle(100, 100, hours * 30, 50, 6, "hour")}
${drawNeedle(100, 100, minutes * 6, 70, 4, "minute")}
${drawNeedle(100, 100, seconds * 6, 80, 2, "second")}
</svg>
`;

container.innerHTML = clockSVG;
}

function drawNeedle(cx, cy, angle, length, width, id) {
const needleX = cx + length * Math.cos((angle - 90) * (Math.PI / 180));
const needleY = cy + length * Math.sin((angle - 90) * (Math.PI / 180));

return `<line id="${id}" x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="black" stroke-width="${width}" />`;
}

window.onload = calculateAngles;
</script>
