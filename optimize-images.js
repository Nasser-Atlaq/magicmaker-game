/**
 * Image Optimization Script
 *
 * This script will optimize your images automatically using sharp
 *
 * Run: node optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const optimizeImages = async () => {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // Optimize background.jpg
    console.log('Optimizing background.jpg...');
    await sharp('public/images/background.jpg')
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile('public/images/background.webp');

    const bgStats = fs.statSync('public/images/background.webp');
    console.log(`✅ background.webp created: ${(bgStats.size / 1024).toFixed(0)} KB\n`);

    // Optimize logo.png
    console.log('Optimizing logo.png...');
    await sharp('public/images/logo.png')
      .resize(180, 120, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 90, lossless: false })
      .toFile('public/images/logo.webp');

    const logoStats = fs.statSync('public/images/logo.webp');
    console.log(`✅ logo.webp created: ${(logoStats.size / 1024).toFixed(0)} KB\n`);

    // Calculate savings
    const bgOriginal = fs.statSync('public/images/background.jpg');
    const logoOriginal = fs.statSync('public/images/logo.png');
    const totalOriginal = bgOriginal.size + logoOriginal.size;
    const totalOptimized = bgStats.size + logoStats.size;
    const savings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

    console.log('📊 Results:');
    console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized: ${(totalOptimized / 1024).toFixed(0)} KB`);
    console.log(`   Savings: ${savings}% smaller! 🎉\n`);
    console.log('✅ Optimization complete!');
    console.log('   Run your dev server and test: npm run dev');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure you have sharp installed:');
    console.log('   npm install --save-dev sharp');
  }
};

optimizeImages();
