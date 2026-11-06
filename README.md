# Mindly — A Clearer Mind for a Brighter You 🧠✨

An award-grade, editorial-style spatial computing landing page designed for a high-focus productivity platform. Built with **React 19**, **Three.js (r187)**, **Tailwind CSS v4**, and **TypeScript**, Mindly brings the concept of "organizing thoughts in 3D space" to life with fluid 60 FPS performance.

---

## 🌟 Key Highlights & Engineering Features

### 1. Parametric Cylindrical Card Curvature
Standard `PlaneGeometry` looks flat and rigid when tilted in 3D space. Mindly uses a custom parametric generator (`createCurvedCardGeometry`):
- Projects plane vertices along a cylinder of radius $R \approx 280\text{px}$:
  $$\theta = \frac{x}{R}, \quad x' = R \cdot \sin(\theta), \quad z' = -R \cdot (1 - \cos(\theta))$$
- Vertex normals are dynamically recomputed with `computeVertexNormals()` so directional lighting catches the curved rim of the glass naturally.

### 2. Procedural High-DPI Canvas Textures
Every frosted glass card (*Focus*, *Ideas*, *Plan*) is procedurally rendered at 2x resolution on an HTML5 canvas:
- Multi-stop linear gradients, 4px border sheen, diagonal specular gloss highlights, and soft Gaussian drop shadows.
- Vibrant iconography (Lime-green concentric focus rings, lavender sparkle star, apricot checklist checkmark).

### 3. WebGL Depth Pipeline & Alpha-Compositing
Eliminates z-fighting and alpha-sorting artifacts via strict explicit `renderOrder`:
- **Background**: Frosted glass ribbons (`renderOrder: 1, 2`) & monochrome mountain card (`renderOrder: 3`)
- **Centerpiece**: High-resolution central portrait plane (`renderOrder: 5`)
- **Foreground Halo**: Plan card (`7`), Focus card (`8`), Moon/Planet card (`9`), and Ideas card (`10`).
- Transparent materials configured with `depthWrite: false` for smooth alpha blending.

### 4. Dynamic Hairline Connector Cables
DOM card positions adjust across screen viewports. A `ResizeObserver` monitors `.getBoundingClientRect()` to compute exact cubic Bézier curves bridging 2D DOM cards into the 3D orbital space with zero drift.

### 5. Damped Mouse Physics & Floating Harmonics
- Smooth exponential camera and mesh damping:
  $$\vec{x}_{t+1} = \vec{x}_t + (\vec{x}_{\text{target}} - \vec{x}_t) \times 0.05$$
- Individual meshes breathe with harmonic sinusoidal frequencies ($\omega$), amplitudes ($A$), and phase offsets ($\phi$):
  $$\Delta y = A \cdot \sin(\omega t + \phi) + \text{mouse}_y \cdot 12 \cdot \text{mult}_{\text{parallax}}$$

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component architecture & modern state management |
| **TypeScript** | Strict type safety and interface contracts |
| **Three.js (r187)** | 3D WebGL rendering, custom curved geometry & lighting |
| **Tailwind CSS v4** | Modern styling engine & glassmorphic UI utilities |
| **Vite 8** | High-performance bundling and rapid HMR development |
| **Lucide React** | Micro-iconography |
| **Google Fonts** | *Instrument Serif* & *Plus Jakarta Sans* editorial typography |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jayeshpatil9869/mindly-spatial-landing-page.git
   cd mindly-spatial-landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── public/
│   └── assets/                  # Public image assets (portrait, mountain, planet)
├── src/
│   ├── assets/images/           # Source image backups
│   ├── components/
│   │   ├── ThreeScene.tsx       # Core Three.js WebGL scene & parametric cards
│   │   ├── Navigation.tsx       # Top editorial navigation & branding
│   │   ├── HeadlineSection.tsx  # Editorial typography & action triggers
│   │   ├── SideCards.tsx        # DOM cards with reactive SVG bezier connector lines
│   │   └── Decorations.tsx      # Editorial badges, soundwave pill, and interactive modals
│   ├── utils/
│   │   ├── cardTextures.ts      # High-DPI procedural canvas texture generators
│   │   └── math3d.ts            # Spatial math & projection helpers
│   ├── App.tsx                  # Main layout container
│   ├── main.tsx                 # React entrypoint
│   └── index.css                # Tailwind CSS v4 styling rules
├── index.html                   # HTML template & typography fonts
├── package.json                 # Project configuration & dependencies
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
