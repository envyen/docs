---
title: How to embed binary data in C programs 
layout: post
comments: true
tags:
- c
---

In systems programming and embedded development, embedding binary data directly into your program can simplify deployment, eliminate filesystem dependencies, and improve security. This blog post explores multiple techniques for embedding binary and text data into your codebase — from simple C arrays to linker scripts and cross-platform object files.

---

## Why Embed Data?

Some practical reasons to embed data into your code:

- Self-contained executables (e.g., for firmware)
- Ship assets (icons, shaders, fonts) with no extra file I/O
- Include certificates, keys, licenses, or compressed payloads
- Avoid filesystem permissions or data tampering
- Speed up initialization and reduce flash read cycles (in embedded)

---

## Technique 1: C Header with Binary Array

Use `xxd -i` or a Python script to convert the binary into a header.

```bash
xxd -i logo.png > logo_png.h
```

logo_png.h
```C
unsigned char logo_png[] = {
  0x89, 0x50, 0x4E, 0x47, ...
};
unsigned int logo_png_len = 532;
```
main.c

```c
#include "logo_png.h"

int main() {
    printf("Logo size: %u bytes\n", logo_png_len);
    fwrite(logo_png, 1, logo_png_len, stdout); // output to verify
    return 0;
}
```

## Technique 2: .incbin with Linker Script

linker_script.ld

```
SECTIONS {
  .rodata : {
    KEEP(*(.rodata))
    _binary_sample_bin_start = .;
    *(.binary_data)
    _binary_sample_bin_end = .;
  }
}
```

binary.S

```
.section .binary_data, "a"
.global _binary_sample_bin_start
.global _binary_sample_bin_end

_binary_sample_bin_start:
  .incbin "sample.bin"
_binary_sample_bin_end:
```

C Code

```
extern const unsigned char _binary_sample_bin_start[];
extern const unsigned char _binary_sample_bin_end[];

int main() {
    size_t size = _binary_sample_bin_end - _binary_sample_bin_start;
    printf("Embedded size: %zu\n", size);
    return 0;
}
```

## Technique 3: objcopy Binary to Object

```
ld -r -b binary -o cert.o cert.pem
gcc -o app app.c cert.o
```

Access from C:

```
extern const unsigned char _binary_cert_pem_start[];
extern const unsigned char _binary_cert_pem_end[];

void print_cert() {
    fwrite(_binary_cert_pem_start, 1, _binary_cert_pem_end - _binary_cert_pem_start, stdout);
}
```

## Technique 4: Embedding as Base64 or Text

Useful for certificates, templates, or encoded assets:
```
const char* cert_base64 =
    "LS0tLS1CRUdJTiBDRVJUSUZJ...";

char decode_base64_char(char c) {
    if (c >= 'A' && c <= 'Z') return c - 'A';
    if (c >= 'a' && c <= 'z') return c - 'a' + 26;
    if (c >= '0' && c <= '9') return c - '0' + 52;
    if (c == '+') return 62;
    if (c == '/') return 63;
    return -1;
}
```

## Technique 5: Windows .rc Resource File

resources.rc
```
logo_icon ICON "logo.ico"
```
Access in C++
```
HRSRC res = FindResource(NULL, MAKEINTRESOURCE(IDI_ICON1), RT_GROUP_ICON);
```
Build:
```
windres resources.rc -O coff -o resources.o
g++ main.cpp resources.o -o app.exe
```
Extra: Embedding Text as Const Strings
```
const char *LICENSE = 
    "MIT License\n\n"
    "Copyright (c)...";
```
Works best for licenses, config templates, HTML, etc.

Packing Structs with Embedded Blobs

Combine embedded blobs with metadata:
```
typedef struct {
    uint32_t version;
    uint32_t data_len;
    uint8_t  data[];
} __attribute__((packed)) blob_t;

extern const blob_t embedded_blob;
```
Tip: Compress Before Embedding

Compress your binary with gzip or zlib before embedding to reduce binary size:
```
gzip -c firmware.bin > firmware.gz
xxd -i firmware.gz > firmware_gz.h
```
Then decompress at runtime (if needed).

#### Security Considerations

- Embedded secrets (keys/certs) can still be extracted from binaries using tools like strings, objdump, or hex editors.
- Obfuscation helps slightly, but runtime loading with encryption is safer for sensitive data.

#### Verification Script

Verify correctness by comparing original with embedded data:
```c
#include <stdio.h>
#include <string.h>

extern const unsigned char _binary_sample_bin_start[];
extern const unsigned char _binary_sample_bin_end[];

int main() {
    FILE *fp = fopen("sample.bin", "rb");
    fseek(fp, 0, SEEK_END);
    size_t fsize = ftell(fp);
    rewind(fp);

    unsigned char *buf = malloc(fsize);
    fread(buf, 1, fsize, fp);
    fclose(fp);

    size_t embedded_size = _binary_sample_bin_end - _binary_sample_bin_start;
    if (embedded_size != fsize || memcmp(buf, _binary_sample_bin_start, fsize) != 0) {
        printf("Mismatch in embedded data!\n");
    } else {
        printf("Embedded data verified successfully.\n");
    }
    free(buf);
    return 0;
}
```

