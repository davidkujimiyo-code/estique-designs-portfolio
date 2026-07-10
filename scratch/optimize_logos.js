import { Jimp } from 'jimp';
import path from 'path';

async function main() {
  const logoPath = 'src/assets/logo-monogram.png';
  console.log('Loading source image:', logoPath);
  const image = await Jimp.read(logoPath);
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log('Original dimensions:', w, 'x', h);
  
  // =========================================================================
  // CROP 1: Entire lockup (monogram + text) - Trim transparent borders
  // =========================================================================
  let lockupYMin = h;
  let lockupYMax = 0;
  let lockupXMin = w;
  let lockupXMax = 0;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y);
      const a = color & 0xff;
      if (a > 10) { // Any pixel with opacity > 10 is part of the visible logo
        if (y < lockupYMin) lockupYMin = y;
        if (y > lockupYMax) lockupYMax = y;
        if (x < lockupXMin) lockupXMin = x;
        if (x > lockupXMax) lockupXMax = x;
      }
    }
  }
  
  if (lockupYMin >= lockupYMax || lockupXMin >= lockupXMax) {
    console.error('No visible logo pixels found!');
    process.exit(1);
  }
  
  // Add a tight padding around the artwork
  const lockupPadding = 15;
  const lockupCropX = Math.max(0, lockupXMin - lockupPadding);
  const lockupCropY = Math.max(0, lockupYMin - lockupPadding);
  const lockupCropW = Math.min(w - lockupCropX, (lockupXMax - lockupXMin) + lockupPadding * 2);
  const lockupCropH = Math.min(h - lockupCropY, (lockupYMax - lockupYMin) + lockupPadding * 2);
  
  console.log('Lockup cropped bounds:', { lockupCropX, lockupCropY, lockupCropW, lockupCropH });
  
  const lockupCropped = image.clone();
  try {
    lockupCropped.crop({ x: lockupCropX, y: lockupCropY, w: lockupCropW, h: lockupCropH });
  } catch (err) {
    lockupCropped.crop(lockupCropX, lockupCropY, lockupCropW, lockupCropH);
  }
  
  const fullCroppedPath = 'src/assets/logo-full-cropped.png';
  await lockupCropped.write(fullCroppedPath);
  console.log('Saved optimized full logo lockup:', fullCroppedPath);
  
  // =========================================================================
  // CROP 2: Gold Monogram ONLY (for navbar, PWA, favicons)
  // =========================================================================
  let monogramRows = [];
  
  for (let y = 0; y < h; y++) {
    let hasGold = false;
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const a = color & 0xff;
      
      if (a > 30 && r > 120 && g > 90 && b < 130) {
        hasGold = true;
        break;
      }
    }
    if (hasGold) {
      monogramRows.push(y);
    }
  }
  
  const yMin = monogramRows[0];
  const yMax = monogramRows[monogramRows.length - 1];
  console.log('Monogram Y bounds:', yMin, yMax);
  
  let xMin = w;
  let xMax = 0;
  for (let y = yMin; y <= yMax; y++) {
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const a = color & 0xff;
      if (a > 30 && r > 120 && g > 90 && b < 130) {
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
      }
    }
  }
  
  console.log('Monogram X bounds:', xMin, xMax);
  
  // Create a square bounding box around the monogram to preserve proportions
  const monoPadding = 25;
  const monoW = xMax - xMin;
  const monoH = yMax - yMin;
  const monoSize = Math.max(monoW, monoH) + monoPadding * 2;
  
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  
  const monoCropX = Math.max(0, Math.floor(centerX - monoSize / 2));
  const monoCropY = Math.max(0, Math.floor(centerY - monoSize / 2));
  const monoCropW = Math.min(w - monoCropX, monoSize);
  const monoCropH = Math.min(h - monoCropY, monoSize);
  
  console.log('Monogram square cropped bounds:', { monoCropX, monoCropY, monoCropW, monoCropH });
  
  const monogramCropped = image.clone();
  try {
    monogramCropped.crop({ x: monoCropX, y: monoCropY, w: monoCropW, h: monoCropH });
  } catch (err) {
    monogramCropped.crop(monoCropX, monoCropY, monoCropW, monoCropH);
  }
  
  const monogramOnlyPath = 'src/assets/logo-monogram-only.png';
  await monogramCropped.write(monogramOnlyPath);
  console.log('Saved optimized monogram-only logo:', monogramOnlyPath);
  
  // =========================================================================
  // CROP 3: Generate Favicons and PWA Icons
  // =========================================================================
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];
  
  for (const s of sizes) {
    const resized = monogramCropped.clone();
    try {
      resized.resize({ w: s.size, h: s.size });
    } catch (err) {
      resized.resize(s.size, s.size);
    }
    const outputPath = path.join('public', s.name);
    await resized.write(outputPath);
    console.log('Wrote favicon:', outputPath);
  }
  
  // Also recreate root favicon.ico as a PNG-styled 32x32 icon
  const icoResized = monogramCropped.clone();
  try {
    icoResized.resize({ w: 32, h: 32 });
  } catch (err) {
    icoResized.resize(32, 32);
  }
  const icoPath = 'public/favicon.ico';
  await icoResized.write(icoPath);
  console.log('Wrote favicon:', icoPath);
  
  console.log('SUCCESS: All brand assets cropped, optimized, and saved!');
}

main().catch(console.error);
