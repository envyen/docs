---
layout: default
parent: image
grand_parent: tools
title: "compress image"

custom-js-list:
    - "https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"
    - "https://cdn.jsdelivr.net/npm/browser-image-compression@1.0.14/dist/browser-image-compression.js"
    - "https://code.jquery.com/jquery-3.2.1.min.js"

custom-css-list:
     - "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"

---


# Compress Image

<style>.bytwo tr td { width:50%; }</style>
<table class="bytwo">
    <tr>
        <td>Max file size</td>
        <td><input type="number" id="maxSizeMB" name="maxSizeMB" value="1" /> MB</td>
    </tr>
    <tr>
        <td>Max width/height</td>
        <td><input type="number" id="maxWidthOrHeight" name="maxWidthOrHeight" value="1024" /> px</td>
    </tr>
</table>
Select an image to compress. Files are processed locally in browser
<table class="bytwo">
    <tr>
	<td>
	    <input id="web-worker" type="file" accept="image/*" onchange="compressImage(event);">
	</td>
	<td>
    	    <span id="web-worker-progress" class="btn fs-3"></span>
	</td>
    </tr>
    <tr>
        <td id="inpPrev">input preview</td>
        <td id="outPrev">output preview</td>
    </tr>
    <tr>
        <td><img id="preview" /></td>
        <td><img id="preview-after-compress" /></td>
    </tr>
</table>

<code class="language-plaintext highlighter-rouge">Uses <a href="https://www.npmjs.com/package/browser-image-compression">'browser-image-compression'</a> version:</code>
<code id="version" class="language-plaintext highlighter-rouge">#.#.#</code>



<script>
  document.querySelector('#version').innerHTML = imageCompression.version;

  function compressImage (event) {
	  var file = event.target.files[0];
	  var progressDom;
	  progressDom = document.querySelector('#web-worker-progress');
	  document.getElementById('preview').src = URL.createObjectURL(file);
	  document.getElementById('inpPrev').innerHTML = 'input (' + (file.size / 1024 / 1024).toFixed(2) + 'MB)';
	  var options = {
maxSizeMB: parseFloat(document.querySelector('#maxSizeMB').value),
	   maxWidthOrHeight: parseFloat(document.querySelector('#maxWidthOrHeight').value),
	   useWebWorker: true,
	   onProgress: onProgress
	  };
	  imageCompression(file, options).then(function (output) {
		  const downloadLink = URL.createObjectURL(output);
		  document.getElementById('web-worker-progress').innerHTML = '<a href="' + downloadLink + '" download="' + file.name + '">Save compressed image</a>';
		  document.getElementById('preview-after-compress').src = downloadLink;
		  document.getElementById('outPrev').innerHTML = 'output (' + (output.size / 1024 / 1024).toFixed(2) + 'MB)';
			  });
	  function onProgress (p) {
		  progressDom.innerHTML = '(' + p + '%' + ')';
	  }
  }
</script>

