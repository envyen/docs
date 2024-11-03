---
title: Equirectangular to Tiny-planet
comments: true
tags:
- ffmpeg
- tinyplanet
- equirectangular
- geometric-transform
layout: post
---

Named Tiny planet, Little planet etc are beautiful effects that converts the projection of an equirecangular image.

![](/upload/tinyplanet/tiny3.jpg) 
[1] Source Image: Photo by <a href="https://unsplash.com/@bryangoffphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Bryan Goff</a>

![](/upload/tinyplanet/tiny2.jpg) 
[2]  Source Image: Photo by <a href="https://unsplash.com/@oldfieldart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Timothy Oldfield</a>

This can be implemented using ffmpeg too:

Please use the latest ffmpeg version to try this. Latest static builds are also available [here](https://johnvansickle.com/ffmpeg/) to try. I have used version `ffmpeg version 4.4-static` for these.
### Remapping Plugin
Ffmpeg got the useful remap plugin. It can remap any source pixels to destination pixels according to the input pixel mapping tables, or maps. 

First we create the xmap and ymap required for the remap plugin. 

The geq filter is used to create the maps we require

`geq` - apply generic equation to each pixel.

Full reference of the `geq` ffmpeg filter is [here:]( https://ffmpeg.org/ffmpeg-filters.html#geq)
### Equations:

$$

\begin{align}

xMap_{(x, y)}=h\times\left(0.9999+\frac{atan2\left( y-h, x-h\right)}{\pi}\right)

\\

yMap_{(x,y)} = h\times( {1-hypot((2\times{\frac{x}{w})-1},(2\times{\frac{y}{w})-1})})

\end{align}

$$

note, 

$$ hypot(x,y) = \sqrt{(x^2+y^2)} $$

### Create Maps
For the example, the Equirectangular input frame has height $$h=1920$$ and width $$w=3840$$

* x-map

`ffmpeg -f lavfi -i nullsrc=size=3840x3840 -vf format=pix_fmts=gray16le,geq="1920*(0.9999 + atan2(Y-1920\,X-1920)/PI)" -frames 1 -y xmap.pgm`

* y-maps

`ffmpeg -f lavfi -i nullsrc=size=3840x3840 -vf format=pix_fmts=gray16le,geq="1920*(1-hypot((2*X/3840)-1\,(2*Y/3840)-1))" -frames 1 -y ymap.pgm`

### Apply maps and remap !
Lets try with an actual equirectangular world map from wikipedia 
<a href="https://commons.wikimedia.org/wiki/File:Equirectangular-projection.jpg" target="_blank">here.</a>

Input image:

![](/upload/tinyplanet/640px-Equirectangular-projection.jpg) 

`ffmpeg -i in.png -i xmap.pgm -i ymap.pgm -lavfi "format=pix_fmts=rgb24,remap" -q:v 2 -y out.png`

Remapped image:

![](/upload/tinyplanet/remapped.jpg)
