---
layout: default
parent: misc
grand_parent: tools
title: "clock angle calculator"
---

# clock angle calculator

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
const seconds = parseInt(timeArray[2]) || 0; /* Default seconds to 0 if not provided */

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


## Understanding the Calculation  

### The Anatomy of an Analog Clock

An analog clock typically consists of three hands: the hour hand, the minute hand, and the second hand. Each hand rotates around the clock's center at different rates, and the angles between them change as time progresses.

1. **Hour Hand:**
   - The hour hand completes a full rotation every 12 hours, covering 360 degrees. Therefore, the rate at which the hour hand moves is given by:
   
     $$ \text{Hour Angle} = 0.5 \times (60 \times \text{hours} + \text{minutes}) $$

2. **Minute Hand:**
   - The minute hand completes a full rotation every hour, covering 360 degrees. Its movement is calculated as:
   
     $$ \text{Minute Angle} = 6 \times \text{minutes} $$

3. **Second Hand:**
   - The second hand completes a full rotation every minute, covering 360 degrees. Its movement is calculated as:

     $$ \text{Second Angle} = 6 \times \text{seconds} $$

### Calculating the Angles

1. **Angle Between Hour and Minute Hands:**

   $$ \text{Angle}_{\text{Hour-Minute}} = \lvert \text{Hour Angle} - \text{Minute Angle} \rvert $$

   To ensure that the smaller angle is considered, we use the formula:

   $$ \text{Angle}_{\text{Hour-Minute}} = \min(360 - \text{Angle}_{\text{Hour-Minute}}, \text{Angle}_{\text{Hour-Minute}}) $$

3. **Angle Between Hour and Second Hands:**

   $$ \text{Angle}_{\text{Hour-Second}} = \lvert \text{Hour Angle} - \text{Second Angle} \rvert $$

   $$ \text{Angle}_{\text{Hour-Second}} = \min(360 - \text{Angle}_{\text{Hour-Second}}, \text{Angle}_{\text{Hour-Second}}) $$

5. **Angle Between Minute and Second Hands:**

   $$ \text{Angle}_{\text{Minute-Second}} = \lvert \text{Minute Angle} - \text{Second Angle} \rvert $$

   $$ \text{Angle}_{\text{Minute-Second}} = \min(360 - \text{Angle}_{\text{Minute-Second}}, \text{Angle}_{\text{Minute-Second}}) $$
