---
title: extract pdf attachments in ubuntu
tags:
- pdf
- utils
layout: post
comments: true
---

PDF files can often come with embedded file attachments. In Windows Adobe reader can extract this easily.
In case of ubuntu, the handy command line utility `pdftk` can help:

### Install pdftk in ubuntu

```shell
sudo apt install pdftk
```

```shell
$ pdftk -version
"
pdftk 2.02 a Handy Tool for Manipulating PDF Documents
Copyright (c) 2003-13 Steward and Lee, LLC - Please Visit: www.pdftk.com
This is free software; see the source code for copying conditions. There is
NO warranty, not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

```

### Extract files
- extract in current directory
```shell
pdftk <pdffile> unpack_files
```

- prompt for output directory
```shell
pdftk <pdffile> unpack_files output PROMPT
```

- specify password if protected pdf
```shell
pdftk <pdffile> input_pw <password> unpack_files output PROMPT
```
