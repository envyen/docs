---
title: How to reset Windows WSL user password 
layout: post
comments: true
tags:
- windows-wsl
- password-reset
- ubuntu
---

The WSL Linux password can be reset easily with below steps:

In Windows once WSL is enabled and any version of Ubuntu installed, there is a ubuntu.exe (or in some cases ubuntu1804.exe, ubuntu1604.exe etc), to configure the Linux subsystem

### Step 1: Login to ubuntu as Root

For this change the default user to `root`

Run this from Windows command prompt or Windows PowerShell

```
ubuntu.exe config --default-user root
```

Hint: Press a tab after typing ubuntu, in case your `ubuntu.exe` name is `ubuntu1804.exe` it will show that. Use this for all the steps instead of `ubuntu.exe`

Now Run ubuntu with user as root, the command prompt will start with `root@` 
```ubuntu.exe```

### Step 2: Change User password

See the list of users last added in Ubuntu:
```
tail /etc/passwd 
```
Change the required user password. Example if user is `myusername`

```
passwd myusername
```

Enter new password and type `exit` to quit from WSL shell

Now set the default user to your username back

### Step 3: Set user back as default user

```
ubuntu.exe config --default-user myusername
```

Done. Now you can login to WSL ubuntu with new password 
