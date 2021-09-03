---
title: PDF to Word in terminal
tags:
- linux-command
- pdf
- utils
---

Quick way to convert pdf to word document from terminal.
Works mostly fine in layouts.

```shell
libreoffice --infilter="writer_pdf_import" --convert-to docx input.pdf
```

