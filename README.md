# Floor 7 1/2 - Interactive Backroom Game

An immersive 3D browser-based game inspired by Being John Malkovich's Floor 7 1/2. Explore a liminal space horror experience with a hopeful ending.

## Overview

Navigate through the mysterious Floor 7 1/2 at the Merkin Flemmer Building. Explore three departments (Compliance, Surveillance, and Pursuance), discover hidden passages, and join the Counter Program.

## Features

### Gameplay
- **First-person 3D exploration** using Three.js
- **Liminal space aesthetics** with institutional environments
- **Progressive discovery** through three unique departments
- **Loop mechanics** that reveal new areas after exploration
- **Hidden tunnel** leading to a massive chamber
- **Counter Program interaction** with multiple endings

### Technical Features
- Full pointer lock controls for immersive gameplay
- Collision detection system
- localStorage persistence for game progress
- Responsive design that works in any modern browser
- Optimized for 60fps performance

## Controls

- **WASD** - Move around
- **Mouse** - Look around (click to enable pointer lock)
- **C** - Crouch/Stand toggle
- **F** - Interact with doors and objects
- **SHIFT** - Sprint
- **ENTER** - Open elevator doors, interact with prompts

## Game Structure

### 1. Elevator
Start in a vintage wooden elevator with flickering floor indicators. Press F or click ENTER button to open the doors.

### 2. Floor 7 1/2 Entrance
Crouch (C key) to fit through the low ceiling entrance.

### 3. Orientation Rooms
Large rooms with three hallway openings leading to different departments:
- **COMPLIANCE** (Green accent)
- **SURVEILLANCE** (Charcoal accent)
- **PURSUANCE** (Navy accent)

### 4. Department Hallways
Each hallway contains:
- 10 numbered doors (subdepartments)
- Color-coded floors matching department theme
- Institutional lighting
- 96 units long with consistent aesthetic

### 5. Loop Mechanic
- First hallway → Loops back to Orientation Room #2
- Second hallway → Loops back to Orientation Room #3
- Third hallway → Triggers dark tunnel (after all three are explored)

### 6. Dark Tunnel
A narrow, dark passage with a light at the end leading to the massive chamber.

### 7. Massive Chamber
The final destination featuring:
- Really Bad Band eye logo
- Black door to Counter Program
- Dramatic lighting with department color accents
- Grand, modern aesthetic

### 8. Counter Program
Join the resistance by:
- Entering your phone number
- Choosing your path:
  - **RESTART** - Reset progress and return to elevator
  - **EXPLORE** - Teleport to random subdepartment
  - **LEARN** - Open conspiracy theory wiki links

## Installation

Simply open `index.html` in a modern web browser. No build process or dependencies required.

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- WebGL support

## Assets

The game uses two image assets:
- `Eye-White_Transparent.png` - Really Bad Band logo for the massive chamber (included)
- `RB_Text.png` - Band text logo for header (optional)

## Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main/master branch
4. Access at `https://[username].github.io/[repository]`

### Any Static Host
Upload all files to any static web hosting service:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting
- etc.

## Game Persistence

Progress is automatically saved in localStorage:
- Completed hallways are tracked
- Game state persists across browser sessions
- Clear localStorage or use RESTART to reset progress

## Design Philosophy

### Aesthetics
- Muted color palette (blacks, grays, off-whites, muted olive)
- Institutional/liminal space feeling
- Slightly "off" - believable but uncanny
- Worn, functional surfaces
- Department-specific color accents

### Audio (Future Enhancement)
Placeholder for future audio implementation:
- Ambient drone in elevator
- Subtle hum in hallways
- Door sounds
- Footsteps
- Atmospheric reverb in chamber

## Technical Stack

- **Three.js** - 3D rendering engine
- **Vanilla JavaScript** - No framework dependencies
- **Canvas API** - For dynamic textures (signs, plaques)
- **localStorage** - Game state persistence
- **Pointer Lock API** - Mouse control

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Created for Really Bad Band website.

## Credits

Inspired by Being John Malkovich's Floor 7 1/2 concept.
