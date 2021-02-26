---
title: opencv
parent: notes
has_children: false
grand_parent: docs

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
