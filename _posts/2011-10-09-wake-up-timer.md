---
title: Wake Up Timer
tags:
- tools
- visual-basic
- windows
- archive
layout: post
---

Wake up timer wakes up the system at specified time from standby or hibernation. After resuming, the desired application or file is executed. An alarm function is also included to notify system wakeup.

![](../../upload/wake1.jpg)   ![](../../upload/wake2.png) 

This was made to setup late night downloads. My Dial-up ISP provides unlimited downloads only during 2AM - 8AM:(. Keeping the system in standby or hibernate till that time saves power.

<div class="label label-yellow"> Note: personal tools archive </div>

The application was developed using Classic Visual Basic 
It utilizes  `SetWaitableTimer` and `SetSystemPowerState` kernel32 api functions of windows to achieve the task. 

This post is kept for historic reasons and unfortunately the binary is no longer available
