---
title: Additive and Subtractive Color model
comments: true
custom-js-list:
- https://cdn.jsdelivr.net/npm/three@0.122.0/build/three.min.js
- https://cdn.jsdelivr.net/npm/three@0.122.0/examples/js/controls/OrbitControls.min.js
- https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
- https://envyen.com/upload/3d/additive-colors.js
- https://envyen.com/upload/3d/subtractive-colors.js
layout: post
tags:
- color
---

<p style='text-align: justify;'>
The color theory defines two common color models: Additive and Subtractive.  
<br/>
The interactive visualisation below shows the mixing of each primary components in the additive and subratctive color models. Drag to rotate, scroll to zoom the layers.
</p>

<h4> Additive </h4>
<canvas id="additive">  </canvas>
<h4> Subtractive </h4>
<canvas id="subtractive" style="border: 1px solid black; ">  </canvas>

<h3>Additive color model - RGB</h3>

<p style='text-align: justify;'>
The additive color model defines how light produces color. The primary colors are Red, Green and Blue. Black (or no light) is the base of this model on which the Red, Green and Blue light adds to generate the spectrum of colors. On reaching the maximum of all three colors creating white color. This is refered to as <b>RGB</b> color model. This is generally used in Optics, photography and digital images.
</p>

<h3>Subtractive color model - CMYK</h3>
<p style='text-align: justify;'>
Used in Printed Images, the subtractive color model defines how pigmented ink produces color. In this model, pigment is used to produce color using reflected light on a white base. The primary colors are Cyan, Magenta, Yellow. The base of the model is White (ex: paper) and on which the Cyan, Magenta and Yellow mixes to generate each colors and maximum of the components reaching black.
<br/><br/>
So what is K ?
<br/><br/>
Different from RGB Light, this model has a 4th component as Black (K/key) color. This is needed as the pigmented ink cannot completely create true black on mixing. If only Cyan, Magenta and Yellow are mixed, we would get a non pure black color due to impurities in those ink colors. The black ink helps neutralize this and adds density to the dark. Thus the printing color model used is <b>CMYK</b>
<br/><br/>
Both of these model can be considered complement to each other.
</p>
