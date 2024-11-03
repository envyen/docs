---
layout: default
parent: misc
grand_parent: tools
title: "ctc hike calculator"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
---

# ctc hike calculator
<p>Enter your current CTC salary and the new CTC salary after the hike to calculate the percentage increase:</p>

<label for="current-salary">Current CTC Salary:</label>
<input type="number" id="current-salary">
<br />

<label for="new-salary">New CTC Salary:</label>
<input type="number" id="new-salary">
<br />

<button onclick="calculateHike()">Calculate Hike Percentage</button>
<p id="hike-percentage"></p>

<script>
  function calculateHike() {
    const currentSalary = document.getElementById("current-salary").value;
    const newSalary = document.getElementById("new-salary").value;
    const hikePercentage = ((newSalary - currentSalary) / currentSalary) * 100;
    document.getElementById("hike-percentage").innerHTML = `The percentage increase is: ${hikePercentage.toFixed(2)}%`;
  }
</script>

When calculating a salary hike, the percentage increase is typically calculated based on the difference between the employee's current salary and their new salary after the hike. This percentage increase can be used to evaluate the effectiveness of a hike and to compare it to other compensation packages.

It's important to note that an employee's total compensation package is often more than just their base salary. For example, a compensation package may include bonuses, stock options, health insurance, and other benefits. When all of these elements are taken into account, the total compensation package is known as the "cost to company" (CTC).

CTC is not equal to salary because it includes all the components of an employee's compensation package, not just their base salary. For example, an employee with a base salary of 50,000 per year may have a CTC of 70,000 per year when benefits, bonuses, and other compensation are included. When calculating a salary hike, it's important to take the employee's CTC into account, rather than just their base salary, in order to accurately evaluate the impact of the hike on the employee's total compensation.
