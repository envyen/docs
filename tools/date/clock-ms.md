---
layout: default
parent: date
grand_parent: tools
title: "clock with milliseconds"

custom-js-list:
    - "https://code.jquery.com/jquery-3.2.1.min.js"
---
<style>
#clockbg {
  position: relative;
  background-color:#1d1d1d;
  width: 100%;
  height: 200px;
}
#clock {
  color: #ddd;
  font: small-caps lighter 60px/150% "Segoe UI",
	Frutiger, "Frutiger Linotype", "Dejavu Sans",
	"Helvetica Neue", Arial, sans-serif;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>

<div id="clockbg"><div id="clock"><span id="mon">January</span><span id="d">1</span>,<span id="y">0</span><br/><span id="h">12</span>:<span id="m">00</span>:<span id="s">00</span>:<span id="mi">000</span></div></div>

<button onclick="openFullscreen();" class="btn btn-green float-right">Full-screen</button>

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

/* based on codepen.io/jasonleewilson/pen/gPrxwX */
Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};
function updateClock() {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli.pad(3)];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}
  updateClock();
  window.setInterval("updateClock()", 1);
</script>
