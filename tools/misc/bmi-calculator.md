---
layout: default
parent: misc
grand_parent: tools
title: "BMI calculator"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
---

# BMI calculator

<form>
  <label for="weight">Weight:</label>
  <input type="number" id="weight" name="weight">
  <select id="weight_unit" name="weight_unit">
    <option value="kg">kg</option>
    <option value="lbs">lbs</option>
  </select>
  <br>
  <label for="height">Height:</label>
  <input type="number" id="height" name="height">
  <select id="height_unit" name="height_unit">
    <option value="m">m</option>
    <option value="in">in</option>
  </select>
  <br>
  <button type="button" onclick="calculateBMI()">Calculate BMI</button>
</form>


<p id="result"></p>

<script>
function calculateBMI(){let e=parseFloat(document.getElementById("weight").value),t=document.getElementById("weight_unit").value,n=parseFloat(document.getElementById("height").value),l=document.getElementById("height_unit").value;"lbs"===t&&(e/=2.205),"in"===l&&(n/=39.37);let u=e/(n*n),o=document.querySelector("#result");o.textContent="Your BMI is "+u.toFixed(1),u<18.5?o.textContent+=". You are underweight.":u<25?o.textContent+=". You are at a healthy weight.":u<30?o.textContent+=". You are overweight.":o.textContent+=". You are obese."}
</script>

A BMI calculator is a tool that calculates a person's body mass index (BMI) based on their height and weight. BMI is a measurement of body fat based on an individual's height and weight, and it is commonly used as a screening tool to identify potential health problems related to weight.

Here's a table of BMI ranges:

| BMI Category | BMI Range |
| --- | --- |
| Underweight | < 18.5 |
| Normal weight | 18.5 - 24.9 |
| Overweight | 25.0 - 29.9 |
| Obesity class I | 30.0 - 34.9 |
| Obesity class II | 35.0 - 39.9 |
| Obesity class III | ≥ 40.0 |


The formula for calculating BMI is weight (kg) divided by height (m) squared. Here's the formula in more detail:

BMI = weight (kg) / height (m)²

To calculate BMI using pounds and inches, the formula is slightly different:

BMI = (weight (lbs) / height (in)²) x 703

