---
title: OpenGL GLFW ImGui Tutorial
comments: true
tags:
- OpenGL
- GLFW
- ImGui

---

OpenGL, GLFW, and ImGui are popular frameworks used in graphics programming. They are widely used in the gaming and entertainment industry for creating graphical user interfaces (GUIs) and rendering 3D graphics. In this blog post, we will provide a tutorial on how to use OpenGL, GLFW, and ImGui to create a simple GUI-based OpenGL application. We will also cover the steps required to install the necessary dependencies on Windows and Linux.

### Prerequisites

Before we begin, you should have a basic understanding of C++ programming language and experience with using CMake to build C++ applications. You will also need to have the following dependencies installed on your system:

-    OpenGL (version 3.3 or higher)
-    GLFW (version 3.3.4 or higher)
-    ImGui (version 1.85 or higher)
-    CMake (version 3.0 or higher)

### Installing Dependencies on Windows

The easiest way to install the dependencies on Windows is by using a package manager such as vcpkg. Follow the steps below to install the dependencies using vcpkg:

1. Download and install vcpkg by following the instructions on the official GitHub repository: https://github.com/microsoft/vcpkg
2. Open a command prompt and run the following command to install GLFW and ImGui:

```
vcpkg install glfw3 imgui[opengl3-binding]
```
This command installs GLFW version 3.3.4 and ImGui version 1.85 with OpenGL 3 bindings.

3. Now that the dependencies are installed, we can move on to creating our OpenGL application.

### Creating an OpenGL Application with GLFW and ImGui

In this section, we will create a simple GUI-based OpenGL application using GLFW and ImGui. Follow the steps below to create the application:

Create a new CMake project and add the following code to the CMakeLists.txt file:

```
cmake_minimum_required(VERSION 3.0)
project(opengl-glfw-imgui)
find_package(OpenGL REQUIRED)
add_subdirectory(lib/glfw)
add_subdirectory(lib/imgui)
add_executable(opengl-glfw-imgui src/main.cpp)
target_include_directories(opengl-glfw-imgui PUBLIC ${OPENGL_INCLUDE_DIR})
target_link_libraries(opengl-glfw-imgui glfw imgui ${OPENGL_gl_LIBRARY})
```
This code sets up the project, finds the necessary dependencies, and links them to our application.

5.    Create a new file named "main.cpp" in the "src" directory and add the following code:

```cpp
#include <imgui.h>
#include <imgui_impl_glfw.h>
#include <imgui_impl_opengl3.h>
#include <GLFW/glfw3.h>

int main()
{
    // Initialize GLFW
    glfwInit();

    // Create a window
    GLFWwindow* window = glfwCreateWindow(800, 600, "OpenGL Application", NULL, NULL);

    // Make the window's context current
    glfwMakeContextCurrent(window);

    // Initialize ImGui
    ImGui::CreateContext();
    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init("#version 330");

    // Main loop
    while (!glfwWindowShouldClose(window))
    {
        // Start the ImGui frame
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();

        // Add GUI elements here
        ImGui::Begin("Hello, world!");
        ImGui::Text("This is some text.");
        ImGui::End();

        // Rendering
        ImGui::Render();
        int display_w, display_h;
        glfwGetFramebufferSize(window, &display_w, &display_h);
        glViewport(0, 0, display_w, display_h
        glClearColor(0.2f, 0.3f, 0.4f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

        // Swap buffers
        glfwSwapBuffers(window);

        // Poll for events
        glfwPollEvents();
    }

    // Cleanup
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();
    glfwTerminate();
    return 0;
}

```


This code initializes GLFW, creates a window, initializes ImGui, and sets up the main loop. The ImGui code inside the main loop adds a simple GUI element to the window.

6. Build the project using CMake by running the following commands in the project directory:

```bash
mkdir build && cd build
cmake ..
cmake --build .
```

This will generate an executable file named "opengl-glfw-imgui" in the "build" directory.

Run the application by executing the following command:

```bash
./opengl-glfw-imgui
```

This will open a window with the GUI element we added in the previous step.

- Installing Dependencies on Linux
The process of installing the dependencies on Linux is similar to that of Windows. However, you can install GLFW and ImGui using your system's package manager.

Follow the steps below to install the dependencies on Ubuntu:

- Install OpenGL and CMake:

```bash

sudo apt-get install libglu1-mesa-dev cmake
```

- Install GLFW and ImGui using apt-get:

```bash

sudo apt-get install libglfw3-dev libglfw3-imgui-dev
```

This command installs GLFW version 3.3.2 and ImGui version 1.79 with OpenGL 3 bindings.

Now that the dependencies are installed, we can follow the same steps as in the previous section to create our OpenGL application.

### Conclusion

In this blog post, we covered how to use OpenGL, GLFW, and ImGui to create a simple GUI-based OpenGL application. 
Also covered the steps required to install the necessary dependencies on Windows and Linux. 
If you are interested in learning more about graphics programming, recommend exploring the official documentation and tutorials for each of these frameworks.


