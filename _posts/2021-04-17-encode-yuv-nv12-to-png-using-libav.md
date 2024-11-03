---
title: Encode YUV/NV12 to PNG using libav
tags:
- YUV
- libav
- image
- png
layout: post
---

Encode a YUVNV12 to PNG using libav

used this for creating thumbnail out of camera captured nv12 buffers on an soc.

![128x64](https://github.com/envyen/libav_yuv2png/raw/master/out/128x64.png
 "128x64")

```cpp
#include <thumbnail.h>

//Initialize once
thumbnail thumb(inWidth,inHeight,thumbWidth,thumbHeight);

//Save PNG thumbs as required
thumb.savepng ("out.png", Ybuffer, UVbuffer);

// or
thumb.savepng ("out.png", YUVbuffer, YUVbuffer + inWidth*inHeight);
                
```
 
<button type="button" name="button" class="btn btn-blue" onclick="window.location='https://github.com/envyen/libav_yuv2png';"><i class='fa fa-github-square'></i> Source on Github</button>
