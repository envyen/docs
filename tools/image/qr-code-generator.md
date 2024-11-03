---
title: qr code generator
layout: default
parent: image
grand_parent: tools
custom-js-list:
- https://code.jquery.com/jquery-3.2.1.min.js
- https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js
custom-css-list:
- https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css
---

# qr code generator
<input id="text" type="text" value="" style="width:100%" placeholder="enter text to generate .." required />
<br />
<div id="qrcode"></div>
<br />
Custom Colors:
<div>
    <input type="color" id="dark" name="dark"
           value="#000">
    <label for="dark">Dark</label>

    <input type="color" id="light" name="light"
            value="#ffffff">
    <label for="light">Light</label>
</div>

<hr />
A QR code is a type of matrix barcode invented in 1994 by the Japanese automotive company Denso Wave. A barcode is a machine-readable optical label that contains information about the item to which it is attached. [Wikipedia](https://en.wikipedia.org/wiki/QR_code)

The QR Code Generator uses script from [@davidshimjs](https://davidshimjs.github.io/qrcodejs/)

<style>
#qrcode {
  width:260px;
  height:260px;
  margin-top:15px;
}
	
</style>

<script>

function makeCode () {
	var elText = document.getElementById("text");
  var elDark = document.getElementById("dark");
	var elLight = document.getElementById("light");
	
	if (!elText.value) {
		/*alert("Input a text");*/
		elText.focus();
		return;
	}

 $("#qrcode").empty();

	var qrcode = new QRCode("qrcode", {
    width: 260,
    height: 260,
    colorDark : elDark.value,
    colorLight : elLight.value,
    correctLevel : QRCode.CorrectLevel.H
 });
	
  qrcode.clear();
	qrcode.makeCode(elText.value);
}

makeCode();

$("#text").
	on("blur", function () {
		makeCode();
	}).
	on("keydown", function (e) {
		if (e.keyCode == 13) {
			makeCode();
	}
});
	
$("#dark").	on("change", function () {
		makeCode();
	});

$("#light").	on("change", function () {
		makeCode();
	});
</script>
