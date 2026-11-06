# Mindly — Complete Project Context & LinkedIn Showcase Kit

> **Project Name:** Mindly — A Clearer Mind for a Brighter You  
> **Core Concept:** 3D Spatial Editorial Landing Page Recreating a Digital Sanctuary with Three.js, React 19, TypeScript, and Tailwind CSS v4.  
> **Local Server URL:** `http://localhost:3000`

---

## 1. Executive Summary & Product Vision

**Mindly** is an award-grade, editorial-style spatial computing landing page designed for a high-focus productivity platform. It reimagines mental clarity by fusing **editorial typography** with **spatial 3D interface elements** that orbit around the user's mind.

Instead of a conventional flat landing page, Mindly brings the concept of "organizing thoughts in 3D space" to life through:
- A central portrait in tranquil contemplation.
- A cylindrical halo of curved, frosted glass widgets (*Focus*, *Ideas*, *Plan*, monochrome mountain landscapes, celestial bodies, and glass ribbons) floating seamlessly in 3D perspective.
- Dynamic hairline connector cables bridging 2D DOM cards into the 3D orbital space.
- Razor-sharp editorial typography powered by *Instrument Serif* and *Plus Jakarta Sans*.

---

## 2. Technical Architecture & Engineering Highlights

### A. Parametric Cylindrical Card Curvature (The Math Behind the Depth)
- **The Challenge**: Standard `THREE.PlaneGeometry` meshes look flat and rigid when tilted, breaking the illusion of an orbital halo wrapping around a head.
- **The Solution**: We engineered a custom parametric generator (`createCurvedCardGeometry` in `src/components/ThreeScene.tsx`):
  - $\theta = x / R$
  - $x' = R \cdot \sin(\theta)$
  - $z' = -R \cdot (1 - \cos(\theta))$
  - Every card vertex is projected along an imaginary cylinder ($R \approx 280\text{px}$).
  - Vertex normals are recalculated with `computeVertexNormals()` so directional specular lighting catches the curved rim of the glass realistically.

### B. High-DPI Procedural Canvas Textures
- Rendered via HTML5 Canvas at 2x pixel ratio ($800 \times 340\text{px}$) in `src/utils/cardTextures.ts`:
  - **Focus**: Lime-green gradient squircle (`#B8F062` → `#84CC16`) with dark olive concentric focus rings.
  - **Ideas**: Lavender/violet gradient squircle (`#D8B4FE` → `#A855F7`) with a pure white 4-pointed sparkle star.
  - **Plan**: Apricot/orange gradient squircle (`#FDBA74` → `#F97316`) with a crisp checklist checkmark.
  - **Glass Effect**: Multi-stop linear gradients, 4px border sheen, diagonal specular highlights, and soft 32px Gaussian drop shadows.

### C. WebGL Depth Sorting & Transparency Pipeline
- Transparent PNGs and glassmorphism often suffer from alpha-sorting z-fighting in Three.js.
- Solved via precise explicit `renderOrder`:
  - `renderOrder = 1, 2`: Background frosted glass ribbons (behind head)
  - `renderOrder = 3`: Monochrome mountain card (behind head)
  - `renderOrder = 5`: Central photographic cutout of the person
  - `renderOrder = 7`: Plan card (in front of head)
  - `renderOrder = 8`: Focus card (in front of head)
  - `renderOrder = 9`: Planet/Moon card (lower right foreground)
  - `renderOrder = 10`: Ideas card (front and center)
- Set `depthWrite: false` on transparent materials to ensure smooth alpha compositing.

### D. Dynamic Hairline Connector Cables
- In `src/components/SideCards.tsx`, DOM card positions change across different screen viewports.
- A `ResizeObserver` / window resize hook queries `.getBoundingClientRect()` to compute exact cubic Bezier anchor points:
  - $d = M(x_1, y_1) \quad C(cx_1, cy_1, cx_2, cy_2, x_2, y_2)$
  - The connector lines stay locked to the card edges and feed directly into the 3D ring with zero visual drift.

### E. Damped Mouse Physics & Parallax
- Implemented smooth exponential damping for camera position and mesh rotation:
  - $\vec{x}_{t+1} = \vec{x}_t + (\vec{x}_{\text{target}} - \vec{x}_t) \times 0.05$
- Individual meshes have unique sinusoidal harmonic frequencies ($\omega$), amplitudes, and phase offsets ($\phi$) for lifelike breathing motion:
  - $\Delta y = A \cdot \sin(\omega t + \phi) + \text{mouse}_y \cdot 12 \cdot \text{mult}_{\text{parallax}}$

---

## 3. Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component architecture, state management, modal handling |
| **TypeScript 5.7+** | Full type safety, strict interface contracts |
| **Three.js (r187)** | 3D WebGL rendering, custom curved geometry, lighting & cameras |
| **Tailwind CSS v4** | Modern CSS engine, glassmorphism utilities |
| **Vite 8** | High-performance bundling and instant HMR dev server |
| **Lucide React** | Clean micro-iconography (soundwaves, arrows, play badges) |
| **Google Fonts** | `Instrument Serif` (editorial display) & `Plus Jakarta Sans` (interface sans) |

---

## 4. Ready-to-Publish LinkedIn Post Templates

---

### 🚀 Option 1: The High-Engagement Story Hook (Recommended)

```markdown
What happens when you combine Apple Vision Pro spatial UI with editorial Swiss typography?

Meet Mindly — a digital sanctuary built to bring mental clarity into 3D space. 🧠✨

Most landing pages are flat grids. But human thoughts aren't 2D — they orbit, connect, and float in space. I wanted to see if we could recreate this experience in the browser with 60 FPS buttery smoothness.

Here is what went under the hood:

1️⃣ Spatial Curvature with Three.js:
Flat 3D planes look stiff when tilted. I built custom parametric geometry that bends vertices around an elliptical cylinder (R = 280px) using trigonometric displacement (x' = R*sin(θ), z' = -R*(1-cos(θ))). Cards now wrap naturally around the subject's head.

2️⃣ Procedural High-DPI Canvas Textures:
Every frosted card (Focus, Ideas, Plan) is procedurally generated at 2x resolution on an HTML5 canvas with glass gradients, diagonal specular gloss sheens, and custom squircle iconography.

3️⃣ Alpha-Blending & Depth Pipeline:
Overlapping transparent meshes often cause z-fighting in WebGL. By designing a strict renderOrder hierarchy (1 to 10) and depthWrite controls, cards seamlessly pass both in front of and behind the central portrait.

4️⃣ Bridging 2D DOM to 3D Space:
The hairline cables connecting the 2D floating cards to the 3D orbital ring aren't static SVG images. They compute live cubic Bézier coordinates via getBoundingClientRect(), so they stay anchored on all viewports without breaking.

Tech Stack:
• React 19 + TypeScript
• Three.js
• Tailwind CSS v4
• Vite 8

Would love your thoughts! How do you see spatial computing influencing web design in 2026?

#WebDevelopment #Frontend #Threejs #ReactJS #TypeScript #CreativeDevelopment #UIUX #DesignEngineering #Web3D #TailwindCSS
```

---

### 🛠️ Option 2: The Deep-Dive Technical Engineering Post

```markdown
Building spatial UI on the web: Solving 3 hard problems with Three.js and React 19 🧵👇

Recently, I built Mindly — an editorial 3D landing page recreating an orbital spatial computing interface.

Here are 3 technical hurdles I had to solve:

1. The Billboard Problem in 3D:
Placing flat planes in 3D space creates a cardboard cutout effect when the user moves the mouse.
👉 Solution: Custom BufferGeometry function createCurvedCardGeometry() that maps vertices along a cylinder radius and recomputes normals on the fly. This gives the cards genuine geometric curvature and specular rim highlights.

2. WebGL Transparency & Alpha Sorting:
With multiple translucent glass cards orbiting a transparent PNG portrait, Three.js default depth buffer caused severe popping and clipping.
👉 Solution: Disabled depthWrite on materials, managed renderOrder explicitly (layers 1-3 behind the head, layer 5 for portrait, layers 7-10 in front), and used ACESFilmicToneMapping for rich contrast.

3. Dynamic 2D-to-3D Responsive Anchoring:
The side cards live in the 2D HTML DOM, while the orbital ring lives inside WebGL. How do you draw connector wires between them that don't drift on window resize?
👉 Solution: A dynamic SVG Bézier curve generator synced to window resize and card bounding rects, recalculating cubic control points (M -> C) in real-time.

Built with React 19, TypeScript, Three.js, and Tailwind CSS v4.

Check out the demo video below! Feedback is always welcome. 💡

#CreativeCoding #FrontendEngineering #ThreeJS #JavaScript #React #WebPerf #CodingTips
```

---

### ⚡ Option 3: Short & Punchy (Great for Video/GIF attachments)

```markdown
Brought spatial computing to the browser with Three.js & React 19. 🌐✨

Mindly — an editorial 3D landing page designed for focus and calm.

Key highlights:
• Parametric curved 3D geometry hugging an elliptical cylinder
• Procedural frosted glass textures with specular gloss
• Damped mouse parallax + organic harmonic floating
• Dynamic 2D-to-3D hairline Bézier connectors
• Instrument Serif & Plus Jakarta Sans typography

What do you think of this aesthetic? Let me know in the comments! 👇

#Frontend #WebDesign #Threejs #React #UIUX #FullStack
```

---

## 5. Tips for Recording Your LinkedIn Demo Video

1. **Window Size**: Record at **1920x1080** or **1440x900** in your browser.
2. **Action Flow**:
   - Start with mouse still (showing the subtle organic breathing/floating animation).
   - Move the cursor slowly across the screen from left to right (showing the smooth 3D parallax and curved cards wrapping around the head).
   - Hover over the CTA buttons (`Get started free`, `Watch video`).
   - Click **Watch video** to showcase the product tour modal.
   - Click **Get the app** to showcase the early access signup form.
   - Keep the clip under **20–30 seconds** for peak engagement.
