---
title: GLSL - Vignetting
tags:
- opengl
- shaders
- glsl
---

```glsl
#define INTENSITY 0.5

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord.xy/iResolution.xy;
    
    // Vignetting algorithm
    vec2 center = uv * 2.0 - 1.0;
    center = center - vec2(0.05, -0.1);
    
    vec2 dist = abs(center - (center/vec2(2.0, 2.0)));
    vec4 vignetting = vec4(dot(dist, dist)*INTENSITY);
    
    // Output to screen
	fragColor = texture(iChannel0, uv) - vignetting;
}
```
https://www.shadertoy.com/view/lsVyzy
