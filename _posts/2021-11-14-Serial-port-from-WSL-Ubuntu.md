---
title: How to use Serial Port from WSL using minicom 
layout: post
comments: true
tags:
- windows-wsl
- serial-port
- ubuntu
---

The COM port number enumerated from Windows is needed in WSL

## From Windows Device Manager

Check for **"USB Serial Port"** under **Ports (COM & LTP)**

```
> Ports (COM & LTP)
  - USB Serial Port (COM9)
```

## From Windows Powershell

Open Windows Powershell and find the connected Serial port COM number. 

This is using the windows hardware class guid: `{4d36e978-e325-11ce-bfc1-08002be10318}`. 

The full list of ClassGuids is available [[here]](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors)

```
> $lptAndCom = '{4d36e978-e325-11ce-bfc1-08002be10318}'
> get-wmiobject -Class win32_pnpentity | where ClassGuid -eq $lptAndCom | select name
```
```
name
----
USB Serial Port (COM9)

```
## Access serial port from WSL

Add the current user to `dialout` group

```
adduser $(whoami) dialout
```

In our case, the tty corresponding to `COM9` in WSL is `/dev/ttyS9`

Change permission of the tty node:

```
chmod +X /dev/ttyS9
```
Install `minicom`

```
sudo apt install minicom
```
Access serial port using minicom

```
minicom -D /dev/ttyS9
```

The default port and port settings can be changed in minicom using `minicom -s`

Please note the port number always changes in Windows when reconnected or connected together with other devices/usb ports. 
Check this on reconnection.
