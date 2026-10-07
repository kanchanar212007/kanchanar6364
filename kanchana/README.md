# Kanchana R — Editorial Portfolio & Engineering Showcase

A personal portfolio website combining editorial fashion aesthetics with software engineering craftsmanship.

---

## 🌟 Key Features & Architectural Highlights

1. **Editorial Luxury Aesthetics**:
   - High-contrast typography pairing *Cormorant Garamond*, *Syne*, and *Plus Jakarta Sans*.
   - Warm ivory/cream background palette (`#FBF9F5`), charcoal text (`#171614`), and muted terracotta accents (`#C85A32`).
   - Magazine-style section numbering, rotating circular seal badge, and smooth marquee ticker.
2. **Interactive Components**:
   - **System Walkthrough & Video Reel**: Embedded responsive 16:9 video player with multi-project demo tabs.
   - **Ask Kanchana AI**: Built-in intelligent conversational assistant trained on Kanchana's background and projects.
   - **Project Detail Modals**: Deep-dive architecture case studies with key metrics, challenges, and tech stack tags.
   - **Interactive Filtering**: Filter both technical skills and featured projects dynamically.
   - **Testimonials Slider**: Animated quote carousel with keyboard and arrow controls.
   - **Inquiry Transmission**: Contact form with floating labels, focus chips, clipboard copy, and toast notifications.
   - **Custom Cursor & Smooth Observer**: Trailing inertia cursor and IntersectionObserver scroll reveals.

---

## 📱 Cross-Browser & Multi-Device Testing Matrix

| Viewport / Device | Breakpoint | Layout Behavior | Status |
|---|---|---|---|
| **Ultra-Wide Desktop** | > 1440px | Constrained max-width (1400px), centered typography & grid | ✅ Verified |
| **Desktop / Laptop** | 1024px – 1440px | 2-column hero, 4-column services, 2-column skills/education | ✅ Verified |
| **Tablet (iPad / Air)** | 768px – 1023px | Collapsed header into mobile drawer, single-column about, 2-column services | ✅ Verified |
| **Mobile (iPhone / Android)** | 320px – 767px | Single-column fluid stacked layout, touch-optimized tap targets, hamburger menu | ✅ Verified |

### Browser Compatibility:
- **Google Chrome / Chromium**: 100% full support for CSS Grid, Flexbox, backdrop-filter, ES6 modules.
- **Apple Safari (macOS & iOS)**: Prefixed `-webkit-backdrop-filter`, smooth momentum scroll, SVG seal rendering.
- **Mozilla Firefox**: Standard CSS transforms and CSS custom properties.
- **Microsoft Edge**: Verified hardware acceleration and scroll progress bar.

---

## 🚀 Deployment Instructions

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Kanchana R editorial portfolio"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) -> **New Repository**.
   - Name it `kanchana-portfolio` (or `username.github.io` for a user site).

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/kanchana-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - In your repository, go to **Settings** -> **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select Branch: `main` / Folder: `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://<your-username>.github.io/kanchana-portfolio/` in 1–2 minutes!

---

### Option 2: Deploy to Vercel (Instant 1-Click)

1. Install Vercel CLI (or connect via GitHub):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Follow the automated CLI prompts (accept defaults).
3. Your portfolio is instantly deployed to a global CDN with SSL enabled.

---

### Option 3: Deploy to Netlify

1. Drag-and-drop the project folder `kanchana/` directly to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or link your GitHub repository to Netlify for continuous deployment on every `git push`.

---

## 🛠 Local Development & Testing

To run the site locally on your computer:

```bash
# Using Python
python -m http.server 8080

# Or using Node / npx
npx http-server . -p 8080
```
Open `http://localhost:8080` in your web browser.

---

## 📄 License & Attribution
Designed & Engineered by **Kanchana R** &bull; 2026. All rights reserved.
