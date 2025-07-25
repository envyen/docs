---
title: Cross-Platform Header-Only C Utility to Get Process Memory Usage 
layout: post
comments: true
tags:
- c
- cpp
- memory
---

Easily retrieve the current memory usage of your C/C++ program in **kilobytes**, **megabytes**, or **JSON**—in a thread-safe and portable way.

## What Is `memory_usage.h`?

`memory_usage.h` is a **header-only**, cross-platform C utility that lets you:

- Get your program’s current memory usage
- Use it in C or C++
- Compile without linking external libraries (except `psapi` on Windows)
- Avoid manual `free()` calls
- Get memory output in `KB`, `MB`, or JSON format
- Use it in multi-threaded programs safely

## Features

| Feature               | Status |
|-----------------------|--------|
| Linux Support         | Yes |
| Windows Support       | Yes |
| Header-only           | Yes |
| No dynamic memory     | Yes |
| Thread-safe           | Yes (via `_Thread_local`) |
| Custom formatting     | Yes (KB, MB, JSON) |
| C/C++ compatible      | Yes |

## Header Code: `memory_usage.h`

Refer to the previous section or save the implementation in a file called `memory_usage.h`.

## How to Use

### Example 1: Basic C Program

```c
#include <stdio.h>
#include "memory_usage.h"

int main() {
    printf("Memory (KB): %s\n", get_memory_usage_str_kb());
    printf("Memory (MB): %s\n", get_memory_usage_str_mb());
    printf("Memory (JSON): %s\n", get_memory_usage_json());
    return 0;
}
```

### Example 2: Thread Safety Test

```c
#include <stdio.h>
#include <pthread.h>
#include "memory_usage.h"

void* thread_func(void* arg) {
    printf("Thread %ld: %s\n", (long)arg, get_memory_usage_str_kb());
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, thread_func, (void*)1);
    pthread_create(&t2, NULL, thread_func, (void*)2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    return 0;
}
```

## Compilation Instructions

### Linux

Install dependencies (if needed):

```bash
sudo apt install build-essential
```

Compile:

```bash
gcc -o mem_test main.c -pthread
```

Run:

```bash
./mem_test
```

Expected output:

```
Memory (KB): 5672 KB
Memory (MB): 5.54 MB
Memory (JSON): {"memory_kb":5672,"memory_mb":5.54}
```

### Windows

Requirements:

- Windows 10 or later
- MinGW (`gcc`) or Visual Studio

Using MinGW:

```bash
gcc -o mem_test.exe main.c -lpsapi
mem_test.exe
```

Using Visual Studio Developer Prompt:

```cmd
cl /EHsc main.c /link psapi.lib
```

## Output Example

```
Memory (KB): 12345 KB
Memory (MB): 12.06 MB
Memory (JSON): {"memory_kb":12345,"memory_mb":12.06}
```

## Notes & Limitations

| Aspect              | Details |
|---------------------|---------|
| Thread safety       | Depends on `_Thread_local` compiler support |
| Memory peak usage   | Not yet implemented |
| Unsupported OS      | Returns `"Unsupported OS"` |
| Reentrancy          | Not reentrant (uses static buffer) |
| Embedded systems    | Not supported (no `/proc`, no WinAPI) |

## Extensions You Can Add

- [ ] Add peak memory (`VmHWM:` on Linux, `PeakWorkingSetSize` on Windows)
- [ ] Output to a log file
- [ ] Expose raw values via `size_t get_memory_kb()`
- [ ] Track deltas over time (`start`/`stop` profiling)

## Test It Yourself

```bash
gcc -o test main.c -pthread     # Linux
gcc -o test.exe main.c -lpsapi  # Windows
```

## Conclusion

This simple, header-only memory tracking utility is a great tool for:

- Debugging memory usage
- Lightweight telemetry
- Teaching and prototyping
- Embedding in CLI tools

You don’t need to link to anything (except `psapi` on Windows), and it "just works" with clean and human-readable output.

## License

You can consider it public domain / MIT-style. Use it freely in any project.
