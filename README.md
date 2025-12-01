# Magicmakers Game

An interactive game that challenges users to identify AI-generated videos vs. real videos.

## 🎮 Game Overview

Players are presented with 5 video comparison challenges. For each challenge:
- Two videos are shown side-by-side (desktop) or stacked (mobile)
- One is AI-generated, one is real
- The AI video position is randomized
- Players have to identify which one is AI-generated
- **Fail-fast logic:** One wrong answer = game over
- **Win condition:** All 5 correct answers = congratulations screen

## 📁 Project Structure

```
magicmaker-game/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   └── background.jpg
│   └── videos/
│       ├── challenge1-ai.mp4
│       ├── challenge1-real.mp4
│       └── ... (10 videos total)
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx
│   │   ├── VideoComparisonScreen.jsx
│   │   ├── CongratulationsScreen.jsx
│   │   ├── FailureScreen.jsx
│   │   ├── MobileWelcomeScreen.jsx
│   │   ├── MobileVideoComparisonScreen.jsx
│   │   ├── MobileCongratulationsScreen.jsx
│   │   ├── ResponsiveContainer.jsx
│   │   └── VideoPlayer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── videoConfig.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── DEPLOYMENT.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd magicmaker-game
```

2. Install dependencies:
```bash
npm install
```

3. Add your video files to `public/videos/`:
   - `challenge1-ai.mp4` & `challenge1-real.mp4`
   - `challenge2-ai.mp4` & `challenge2-real.mp4`
   - `challenge3-ai.mp4` & `challenge3-real.mp4`
   - `challenge4-ai.mp4` & `challenge4-real.mp4`
   - `challenge5-ai.mp4` & `challenge5-real.mp4`

4. Ensure assets exist in `public/images/`:
   - `logo.png` - Logo image
   - `background.jpg` - Background image

### Development

Start the development server:
```bash
npm run dev
```

Open your browser to the URL shown (usually http://localhost:5173)

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Poppins Font** - Google Fonts typography

## 🎨 Features

- **Responsive Design:** Automatically adapts to desktop (1577x1117 design) and mobile (433x956 design)
- **Glass Morphism UI:** Modern frosted glass effects with backdrop blur
- **Smooth Animations:** Optimized transitions and hover effects (100ms for instant feedback)
- **Video Randomization:** AI video position randomizes each game
- **Fail-Fast Logic:** Immediate feedback on wrong answers
- **Mobile Optimized:** Touch-friendly with vertical video stacking
- **Error Handling:** Graceful video loading fallbacks
- **Performance Optimized:** Fast transitions, minimal bundle size

## 🎯 Game Logic

1. **Welcome Screen:** Introduction and game instructions
2. **5 Video Challenges:**
   - Left/right (desktop) or top/bottom (mobile) video comparison
   - One AI-generated, one real
   - Click to select, then click NEXT
3. **Instant Validation:**
   - Wrong answer → Failure screen immediately
   - Correct answer → Next challenge or Congratulations
4. **Results:**
   - Failure screen shows score (e.g., 2/5)
   - Congratulations screen shows 5/5 with prize message

## 📦 Video Specifications

- **Format:** MP4 (H.264 codec)
- **Duration:** 5 seconds each
- **Resolution:** 1920x1080 or 1280x720 recommended
- **File Size:** 500KB - 2MB per video (compressed)
- **Audio:** No audio track required
- **Attributes:** autoPlay, muted, playsInline (for mobile compatibility)

## 📱 Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions including:
- Pre-deployment checklist
- Testing guide
- Deployment options (Vercel, Netlify, GitHub Pages, Custom Server)
- Performance optimization tips
- Troubleshooting common issues

## 🤝 Contributing

This is a private project. For any questions or issues, contact the development team.

## 📄 License

Private project - All rights reserved

---

Made with ❤️ by the Magicmakers team
