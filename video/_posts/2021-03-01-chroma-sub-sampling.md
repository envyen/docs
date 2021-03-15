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

Even after decades, we still uses this efficient technique to compress video data.
The element in picture can be represented as a pixel in digital image.
