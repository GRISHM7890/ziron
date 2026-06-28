# ZIRON — Building India's Intelligent Future

A premium, dark-luxury enterprise landing hero built for **ZIRON**, a futuristic AI-first technology holding company. The interface blends a premium aesthetic inspired by Apple, Stripe, Linear, and OpenAI.

**Production Deployment URL:** [https://ziron-limited.vercel.app](https://ziron-limited.vercel.app)

---

## 🌌 Core Features & Design Principles

- **Dark Luxury Palette**: Utilizes deep rich blacks (`#030303`), subtle glass panels, and colored glowing accents (Indigo, Violet, and Cyan) for a premium space aesthetic.
- **Ultra Smooth Glassmorphism**: Thin semi-transparent borders, dense backdrop filters (`blur(20px)`), and radial glow drop-shadows.
- **Cinematic & Interactive Lighting**: Real-time cursor coordinates update an ambient spotlight tracker that smoothly floats behind text and buttons.
- **Animated Grid Overlay**: Vector grid lines that gradually fade out towards the edges using radial mask gradient blends.
- **3D Neural Web Sphere**: Built with Three.js. Standard standard points distributed as a Fibonacci lattice that dynamically connects nodes within threshold range using fading line segments. Integrates cursor-responsive rotation physics using smooth lerping.
- **Staggered Page-Load Transitions**: GSAP timelines coordinate entrances (Navbar -> Grid -> Badge -> Split Headers -> Sector Tags -> CTA Buttons -> Canvas wrapper) with full React hook cleanup to prevent memory leaks.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Scaffolding / Bundler**: Vite (TypeScript template)
- **3D Rendering**: Three.js
- **Animations**: GSAP (GreenSock) & `@gsap/react`
- **Styling**: Vanilla CSS custom variables

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── BackgroundEffects.tsx  # Handles grid overlay, floating mesh blobs, and mouse glow tracker
│   ├── Navbar.tsx             # Glassmorphic header navbar
│   ├── Hero.tsx               # Structural two-column layout grid
│   ├── HeroContent.tsx        # Left column: Badges, main headers, sector tags, CTA buttons
│   ├── NeuralSphere.tsx       # Right column: Three.js webgl sphere rendering and mouse-rotation hook
│   └── ScrollIndicator.tsx    # Bottom viewport scroll indicators
├── App.tsx                    # Orchestrates layout pages and triggers entry timeline animations
├── main.tsx                   # React entry point
└── index.css                  # Design tokens, fonts, resets, and utility classes
```

---

## 🚀 Running Locally

Ensure you have [Node.js](https://nodejs.org) installed, then execute:

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Compile production bundle
npm run build
```

---

## 🌐 Vercel Deployments

This project is configured for automated builds on Vercel:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
