import { Jimp } from 'jimp';
import path from 'path';

async function main() {
  const logoPath = 'src/assets/logo-monogram.png';
  console.log('Loading image:', logoPath);
  const image = await Jimp.read(logoPath);
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log('Dimensions:', w, 'x', h);
  
  let monogramRows = [];
  
  // Scan pixels to find gold monogram bounds
  for (let y = 0; y < h; y++) {
    let hasGold = false;
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y); // returns hex number 0xRRGGBBAA
      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const a = color & 0xff;
      
      if (a > 30) {
        // Gold check
        if (r > 120 && g > 90 && b < 130) {
          hasGold = true;
          break;
        }
      }
    }
    if (hasGold) {
      monogramRows.push(y);
    }
  }
  
  if (monogramRows.length === 0) {
    console.error('No gold monogram pixels found!');
    process.exit(1);
  }
  
  const yMin = monogramRows[0];
  const yMax = monogramRows[monogramRows.length - 1];
  console.log('Y bounds:', yMin, yMax);
  
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
  
  console.log('X bounds:', xMin, xMax);
  
  const padding = 30;
  const rawW = xMax - xMin;
  const rawH = yMax - yMin;
  const size = Math.max(rawW, rawH) + padding * 2;
  
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  
  const cropX = Math.max(0, Math.floor(centerX - size / 2));
  const cropY = Math.max(0, Math.floor(centerY - size / 2));
  const cropW = Math.min(w - cropX, size);
  const cropH = Math.min(h - cropY, size);
  
  console.log('Cropping square bounds:', { cropX, cropY, cropW, cropH });
  
  // Crop the image
  const cropped = image.clone();
  try {
    cropped.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  } catch (err) {
    cropped.crop(cropX, cropY, cropW, cropH);
  }
  
  // Sizes to output:
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'favicon.ico', size: 32 }
  ];
  
  for (const s of sizes) {
    const resized = cropped.clone();
    try {
      resized.resize({ w: s.size, h: s.size });
    } catch (err) {
      resized.resize(s.size, s.size);
    }
    const outputPath = path.join('public', s.name);
    await resized.write(outputPath);
    console.log('Wrote:', outputPath);
  }
  
  console.log('SUCCESS: All favicon and PWA assets generated!');
}

main().catch(console.error);
