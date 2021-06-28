---
title: OpenCV - YUV NV12 to BGR conversion
layout: post
tags:
- opencv
---

How to convert an nv12 buffer to BGR in OpenCV, C++

```cpp
cv::Mat BGR;
cv::Mat NV12 = cv::Mat(height * 3/2, Width, CV_8UC1, nv12Buffer);

cv::cvtColor(NV12, BGR, CV_YUV2BGR_YV12);
cv::imwrite("bgr.png", BGR);
```
