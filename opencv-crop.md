---
title: opencv
parent: notes
has_children: false
grand_parent: docs
date: '2021-02-26 22:02:30'
---

##### crop image

```
cv::Mat image = imread(...);

// setup a rectangle to define roi
cv::Rect myROI(10, 10, 100, 100);

// crop to roi
// Note that this doesn't copy the data
cv::Mat croppedImage = image(myROI);

```
