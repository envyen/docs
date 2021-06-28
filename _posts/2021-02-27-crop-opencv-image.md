---
title: OpenCV - Crop Image
tags:
- opencv
---

How to Crop an OpenCV Mat on specific co-ordinates

```cpp
cv::Mat image = imread(...);

// setup a rectangle to define roi
cv::Rect myROI(10, 10, 100, 100);

// crop to roi
// Note that this doesn't copy the data
cv::Mat croppedImage = image(myROI);

```
