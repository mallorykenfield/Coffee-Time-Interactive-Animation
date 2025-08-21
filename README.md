# 3D Coffee Simulator
# Overview

This repository contains the source code for an interactive 3D coffee simulator built with WebGL and TinyGraphics. The project allows users to personalize their drink by selecting coffee type, mug, and additives while exploring the scene from multiple camera angles.

# Project Goals

  - Apply computer graphics concepts using WebGL and the TinyGraphics framework.
  
  - Implement dynamic lighting, shadow mapping, and texture mapping.
  
  - Explore procedural animations for interactive scene elements (milk, whipped cream, marshmallows, sugar).
  
  - Practice camera control and matrix transformations for multiple perspectives.

# Features

Drink Customization: Choose coffee type, mug, and additives.

Graphics Techniques: Implements lighting, shadow mapping, and texture mapping.

Camera Controls: Switch between top and front views interactively.

Procedural Animation: Milk pouring, whipped cream placement, and marshmallow floating.

# Preview


# Scripts
1) index.html

  Purpose: Main entry point for running the simulator. Loads TinyGraphics and project scripts, then launches the 3D scene in the browser.

  Output: Opens the interactive coffee simulator directly in a WebGL-compatible browser.

2) main-scene.js

  Purpose: Core implementation of the simulator’s scene. Defines objects, animations, and controls.

  Key Features:

  - Initializes camera controls

  - Manages scene objects such as coffee, mugs, and additives.

  - Implements dynamic lighting, shadow mapping, and texture effects.

  - Contains procedural animations for milk pouring and topping placement.

  Output: Renders an interactive 3D coffee scene with customizations and animations.

3) Other Supporting Files

  - Define custom shapes, materials, and textures.

  - Handle object definitions for mugs, whipped cream, marshmallows, etc.

# Methods

Frameworks: WebGL with TinyGraphics library.

Graphics Techniques:

- Matrix transformations for positioning and animation.

- Dynamic lighting and shadow mapping.

- Texture mapping for realistic surface detail.

- Procedural animation for beverage effects.


# How to Run

1) Clone the repository to your local machine.

2) Ensure you have a WebGL-compatible browser (e.g., Chrome, Firefox). The project relies on the TinyGraphics framework, which is included in the repository.

3) Open index.html in the browser.

4) Use the on-screen control panel or keyboard shortcuts to interact with the animation.
