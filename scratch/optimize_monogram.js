import { Jimp } from 'jimp';
import path from 'path';

async function main() {
  const logoPath = 'src/assets/logo-monogram-raw.png';
  console.log('Loading standalone monogram:', logoPath);
  const image = await Jimp.read(logoPath);
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  console.log('Original dimensions:', w, 'x', h);
  
  // Find visible bounding box
  let xMin = w;
  let xMax = 0;
  let yMin = h;
  let yMax = 0;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = image.getPixelColor(x, y);
      const a = color & 0xff;
      if (a > 10) {
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
  }
  
  if (xMin >= xMax || yMin >= yMax) {
    console.error('No visible pixels found in monogram!');
    process.exit(1);
  }
  
  const rawW = xMax - xMin;
  const rawH = yMax - yMin;
  const visibleSize = Math.max(rawW, rawH);
  
  // To make the visible logo occupy 85% of the square canvas:
  // visibleSize / canvasSize = 0.85 => canvasSize = visibleSize / 0.85
  const canvasSize = Math.floor(visibleSize / 0.85);
  
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  
  const cropX = Math.max(0, Math.floor(centerX - canvasSize / 2));
  const cropY = Math.max(0, Math.floor(centerY - canvasSize / 2));
  const cropW = Math.min(w - cropX, canvasSize);
  const cropH = Math.min(h - cropY, canvasSize);
  
  console.log('Monogram cropping bounds (85% coverage):', { cropX, cropY, cropW, cropH });
  
  const cropped = image.clone();
  try {
    cropped.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
  } catch (err) {
    cropped.crop(cropX, cropY, cropW, cropH);
  }
  
  const optimizedMonogramPath = 'src/assets/logo-monogram-only.png';
  await cropped.write(optimizedMonogramPath);
  console.log('Saved optimized monogram-only logo:', optimizedMonogramPath);
  
  // Generate all favicons and PWA icons
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
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
    console.log('Wrote favicon:', outputPath);
  }
  
  console.log('SUCCESS: Monogram optimized and favicons written!');
}

main().catch(console.error);
