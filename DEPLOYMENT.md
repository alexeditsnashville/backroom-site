# Deployment Guide - Floor 7 1/2

## Quick Deploy to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select the branch (main/master)
   - Click "Save"

2. **Access Your Game:**
   - Your game will be available at: `https://[username].github.io/[repository]/`
   - Example: `https://alexeditsnashville.github.io/reallybadband/`

3. **Custom Domain (Optional):**
   - Add a CNAME file with your domain
   - Configure DNS settings with your domain provider
   - Update GitHub Pages settings with custom domain

## Deploy to Netlify

### Option 1: Drag & Drop
1. Visit [netlify.com](https://www.netlify.com/)
2. Drag your repository folder to the deploy zone
3. Your site is live!

### Option 2: Git Integration
1. Connect your GitHub repository
2. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Deploy!

## Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Your site is deployed!

## Deploy to Any Static Host

The game consists of static files and can be deployed to any web host:

### Files to Upload:
- `index.html` (required)
- `Eye-White_Transparent.png` (required)
- `RB_Text.png` (optional - for logo)
- `README.md` (optional - documentation)

### Compatible Hosts:
- AWS S3 + CloudFront
- Firebase Hosting
- Azure Static Web Apps
- Cloudflare Pages
- DigitalOcean App Platform
- Surge.sh
- Render
- Any traditional web hosting (cPanel, etc.)

## Testing Locally

### Simple HTTP Server (Python)
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

### Simple HTTP Server (Node.js)
```bash
npx http-server
```

### PHP Built-in Server
```bash
php -S localhost:8080
```

## Browser Requirements

**Minimum Requirements:**
- Modern browser with WebGL support
- JavaScript enabled
- ES6 module support (for Three.js)

**Recommended Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Three.js Not Loading
- **Issue:** Black screen or "THREE is not defined" error
- **Solution:** Check browser console, ensure CDN is accessible, check browser compatibility

### Images Not Loading
- **Issue:** Eye logo or band logo not displaying
- **Solution:** Verify image files are in the same directory as index.html, check file permissions

### Performance Issues
- **Issue:** Low FPS, stuttering
- **Solution:** 
  - Close other browser tabs
  - Update graphics drivers
  - Try a different browser
  - Reduce browser window size

### Pointer Lock Not Working
- **Issue:** Mouse controls not engaging
- **Solution:** Click on the canvas area, ensure browser supports Pointer Lock API

### localStorage Not Persisting
- **Issue:** Game progress not saving
- **Solution:** 
  - Check browser privacy settings
  - Ensure cookies/localStorage are enabled
  - Try incognito/private mode to test
  - Check if browser storage quota is full

## Post-Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices (if applicable)
- [ ] Verify all images load correctly
- [ ] Test pointer lock controls
- [ ] Verify localStorage persistence
- [ ] Test all three hallways
- [ ] Test tunnel and chamber appearance
- [ ] Test Counter Program form
- [ ] Test RESTART, EXPLORE, and LEARN buttons
- [ ] Test MUSIC button link
- [ ] Check performance (should maintain 60fps)

## Performance Optimization (Optional)

If you need to optimize for slower connections:

1. **Compress Images:**
   ```bash
   # Using ImageMagick
   convert Eye-White_Transparent.png -quality 85 Eye-White_Transparent-optimized.png
   ```

2. **Enable GZIP Compression:**
   - Most static hosts enable this by default
   - Check your hosting provider's documentation

3. **Use CDN:**
   - Consider using Cloudflare or similar CDN
   - Improves load times globally

## Security Considerations

- Three.js is loaded from unpkg.com CDN
- No sensitive data is transmitted
- Phone numbers entered in Counter Program form are only stored in localStorage
- No backend server required
- All processing happens client-side

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are properly uploaded
3. Test in different browsers
4. Check hosting provider status page

## Credits

Built for Really Bad Band
Inspired by Being John Malkovich's Floor 7 1/2
