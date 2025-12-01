# Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Video Files Setup
- [ ] Add all 10 video files to `public/videos/` folder
- [ ] Verify video naming: `challenge1-ai.mp4`, `challenge1-real.mp4`, etc.
- [ ] Confirm each video is exactly 5 seconds long
- [ ] Check video file sizes (recommended: 500KB - 2MB each)
- [ ] Verify videos play without audio
- [ ] Test videos in both Chrome and Safari

### 2. Asset Verification
- [ ] Confirm `public/images/logo.png` exists
- [ ] Confirm `public/images/background.jpg` exists
- [ ] Check image file sizes (compress if > 500KB)

### 3. Code Quality
- [ ] No console errors in browser DevTools
- [ ] All components render correctly on desktop
- [ ] All components render correctly on mobile (width ≤ 768px)
- [ ] Videos play automatically and muted
- [ ] Green selection highlight works smoothly
- [ ] NEXT button only enables when video is selected
- [ ] Game logic works: fail on wrong answer, win after 5 correct

### 4. Testing Checklist

#### Desktop Testing (1920x1080, 1366x768, 2560x1440)
- [ ] Welcome screen displays correctly
- [ ] Video comparison screen displays correctly
- [ ] Videos play automatically
- [ ] Can select videos with green highlight
- [ ] NEXT button works
- [ ] Failure screen appears on wrong answer
- [ ] Congratulations screen appears after 5 correct answers
- [ ] No white flashes during transitions

#### Mobile Testing (375x667, 414x896, 390x844)
- [ ] Welcome screen centered
- [ ] Video comparison screen centered
- [ ] Glass cards centered
- [ ] Videos stack vertically
- [ ] Touch selection works
- [ ] NEXT button works on mobile

#### Cross-Browser Testing
- [ ] Chrome/Edge (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Firefox (Desktop)

#### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] Videos start playing immediately after selection
- [ ] Smooth transitions between screens
- [ ] No lag when selecting videos

## 🚀 Build for Production

### Step 1: Create Production Build
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Step 2: Test Production Build Locally
```bash
npm run preview
```

Open the URL shown (usually http://localhost:4173) and test the production build thoroughly.

### Step 3: Check Build Output
- [ ] `dist/` folder created successfully
- [ ] Check build size (should be < 5MB including videos)
- [ ] Verify all assets copied to `dist/assets/`

## 📦 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts:
   - Link to existing project or create new
   - Select project settings (defaults are fine)
   - Deploy!

4. Get your live URL (e.g., `https://your-project.vercel.app`)

**Vercel Benefits:**
- Automatic HTTPS
- Global CDN
- Instant deployments
- Free for personal projects

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

3. Specify `dist` as the deploy folder

**Netlify Benefits:**
- Similar to Vercel
- Great for static sites
- Free tier available

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Add base path to `vite.config.js`:
```javascript
export default defineConfig({
  base: '/magicmaker-game/', // Your repo name
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Custom Server (VPS/AWS/DigitalOcean)

1. Build the project:
```bash
npm run build
```

2. Upload `dist/` folder contents to your server's web root

3. Configure server to serve `index.html` for all routes

**Nginx example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/magicmaker-game;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Post-Deployment

### 1. Verify Live Site
- [ ] Visit your live URL
- [ ] Test all game functionality
- [ ] Check mobile responsiveness
- [ ] Verify videos load and play
- [ ] Test on different devices

### 2. Performance Check
Use these tools:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

**Target Metrics:**
- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms

### 3. Monitoring (Optional but Recommended)

Add analytics to track usage:

**Google Analytics:**
1. Create GA4 property
2. Add tracking code to `index.html` in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🐛 Common Deployment Issues

### Videos Not Playing
- **Issue:** Videos don't autoplay on mobile
- **Fix:** Ensure videos are muted (browsers block autoplay with sound)
- **Fix:** Use `playsInline` attribute (already implemented)

### 404 Errors on Refresh
- **Issue:** Refreshing page shows 404
- **Fix:** Configure server to serve index.html for all routes (see server configs above)

### Large Bundle Size
- **Issue:** Initial load is slow
- **Fix:** Compress videos more aggressively
- **Fix:** Consider lazy loading videos only when needed

### CORS Errors with Videos
- **Issue:** Videos from external CDN don't play
- **Fix:** Ensure videos are served with proper CORS headers
- **Fix:** Use same domain or configure CDN properly

## 📊 Performance Optimization Tips

1. **Video Compression:**
   ```bash
   # Compress videos with FFmpeg
   ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -an output.mp4
   ```

2. **Image Optimization:**
   - Convert PNG to WebP for smaller file sizes
   - Use TinyPNG or Squoosh.app to compress

3. **Enable Gzip/Brotli:**
   - Most hosting platforms enable this automatically
   - Reduces JavaScript bundle size by 60-70%

4. **CDN for Videos (Advanced):**
   - Upload videos to Cloudinary or AWS S3
   - Update video URLs in `videoConfig.js`
   - Benefits: faster loading, reduced bandwidth costs

## 🔒 Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] No sensitive data in client code
- [ ] No API keys exposed
- [ ] Content Security Policy headers configured (optional)

## 📝 Environment Variables (If Needed)

If you add features requiring environment variables:

1. Create `.env.production`:
```
VITE_API_URL=https://api.yourbackend.com
```

2. Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. Configure in deployment platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

## ✅ Final Checklist Before Going Live

- [ ] All videos added and tested
- [ ] Production build tested locally (`npm run preview`)
- [ ] Tested on multiple devices and browsers
- [ ] Performance metrics meet targets
- [ ] Meta tags updated with correct info
- [ ] Favicon displays correctly
- [ ] No console errors
- [ ] Game logic works correctly (5 challenges, fail on wrong, win on all correct)
- [ ] Analytics tracking added (optional)
- [ ] Custom domain configured (if applicable)

## 🎉 You're Ready to Deploy!

Choose your deployment platform and follow the steps above. Good luck!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
