---
title: Animating homography
tags:
- opencv
- homography
- perspective-transform
---

A trick to animate the perspective transformation between two planes.
The homography matrix is a 3x3 matrix computed from point correspondence. 

This is explained in the previous post [ ]

Here the homoraphy matrix is smoothly interpolated between the source image plane homography itself and the requited destination image plane. Used the `addWeighted()` function for this.

{% include youtube.html id="eYwIhMcSuqc" %}

Code:

```cpp
 vector<Point2f> pts_src;
  pts_src.push_back(Point2f(275, 194));
  pts_src.push_back(Point2f(211, 455));
  pts_src.push_back(Point2f(540, 479));  
  pts_src.push_back(Point2f(555, 212));

  vector<Point2f> pts_dst;
  pts_dst.push_back(Point2f(226, 314));
  pts_dst.push_back(Point2f(435, 511));
  pts_dst.push_back(Point2f(688, 374));  
  pts_dst.push_back(Point2f(463, 213));
   
  Mat s = findHomography(pts_src, pts_src);
  Mat d = findHomography(pts_src, pts_dst);
  
  for(int i=0; i<150; i++)
  {
      addWeighted (s,1-(i/150.0),d,(i/150.0),0,h);
      warpPerspective(im_src, im_out, h, im_dst.size());
      video.write (im_out);
  }

```


.
