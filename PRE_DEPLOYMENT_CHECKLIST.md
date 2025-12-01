# Quick Pre-Deployment Checklist

Use this checklist right before deploying to production.

## 📦 Assets Ready

- [ ] All 10 video files added to `public/videos/`:
  ```
  public/videos/
  ├── challenge1-ai.mp4
  ├── challenge1-real.mp4
  ├── challenge2-ai.mp4
  ├── challenge2-real.mp4
  ├── challenge3-ai.mp4
  ├── challenge3-real.mp4
  ├── challenge4-ai.mp4
  ├── challenge4-real.mp4
  ├── challenge5-ai.mp4
  └── challenge5-real.mp4
  ```

- [ ] Images exist in `public/images/`:
  - `logo.png`
  - `background.jpg`

## 🧪 Local Testing

- [ ] Run development server (`npm run dev`) - no errors
- [ ] Test on desktop (1920x1080)
- [ ] Test on mobile (responsive mode or real device)
- [ ] All 5 challenges work correctly
- [ ] Videos play automatically
- [ ] Selection highlights work (green glow)
- [ ] NEXT button only enables when video selected
- [ ] Wrong answer shows failure screen
- [ ] 5 correct answers show congratulations screen
- [ ] No console errors in browser DevTools

## 🏗️ Production Build

- [ ] Run `npm run build` successfully
- [ ] Run `npm run preview` and test thoroughly
- [ ] Check `dist/` folder size (should be reasonable)
- [ ] No build warnings or errors

## 🚀 Deploy

Choose your platform:

### Vercel (Easiest - Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Update vite.config.js base path
npm run deploy
```

## ✅ Post-Deployment

- [ ] Visit live URL and test completely
- [ ] Test on real mobile device
- [ ] Check browser console for errors
- [ ] Verify all videos load and play
- [ ] Run Google PageSpeed Insights
- [ ] Share with team for testing

## 🎯 Performance Targets

- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- No layout shifts or jank

---

**Ready to deploy?** Follow the steps in [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions!
