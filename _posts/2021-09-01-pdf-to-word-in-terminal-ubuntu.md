---
title: PDF to Word in terminal
tags:
- linux-command
- pdf
- utils
layout: post
---

Quick way to convert pdf to word document from terminal.
Works mostly fine in layouts.

```shell
libreoffice --infilter="writer_pdf_import" --convert-to docx input.pdf
```
```
>      convert input.pdf -> input.docx using filter : MS Word 2007 XML
```

In some cases its better to use `doc` as format to keep the alignments and layouts

```shell
libreoffice --infilter="writer_pdf_import" --convert-to doc input.pdf
```

```
>      convert input.pdf -> input.doc using filter : MS Word 97
```


