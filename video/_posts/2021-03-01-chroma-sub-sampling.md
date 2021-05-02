---
title: Chroma Sub-sampling
layout: post
tags:
- color
- video
- YUV
---

`YUV 4:4:4` `YUV 4:2:2` `YUV 4:2:0` ... ?

In early days of Television Engineering, only brightness of each element of a scene was used to represent a image. 

The video signal at the output of camera tube represents brightness of an element, which is amplified and converted for transmission over a radio or wired channel. On receiver the signals picked up are converted to a electron beam whose intensity is controlled according to the brigness of the element. This illuminates the phospor/coating on the inside of tv screen to end up in final image our parents watched from a sofa.

Once color television was developed, Television Video Engineers found out ways to compress video for color transmission for broadcasting within the bandwidth requirements.

The discovery that human eye is more sensitive to luminance information than color information of a scene lead to 'chroma subsampling' technique. This means brightness is more important than color of a element in the picture.

Even after decades, we still uses this efficient technique to compress video data. The element in picture can be represented as a pixel in digital image.

Chroma subsampling is the technique of encoding images using less resolution for chroma than for luma. Subsampling methods are expressed as a 3 part ratio - `J:a:b` which defines the chroma resolution in relation to a `J x 2` block of luma pixels.

`J` is the horizontal sampling reference (usually 4)

`a` is the number of chroma samples in the first row of a pixels (horizontal resolution in relation to a)

`b` is the number of changes of chroma samples between the first and seconds rows of a pixels.

Common schemes used in modern codecs are: `4:4:4` (no subsampling), `4:2:2`, `4:1:1`, `4:2:0`, `4:1:0`.

![](../../upload/yuv420.png) 

* the `4` in `4:2:0` is the width of the grid taken as a reference
* the `2` in `4:2:0` is the number of chrominance values for the first row
* the `0` in `4:2:0` is the number of changes in chrominance between the first and second row.  The first and second row share same chrominance values

Similarly,

![](../../upload/yuv444.png) 

![](../../upload/yuv422.png)

![](../../upload/yuv411.png)
