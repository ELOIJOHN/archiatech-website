#!/usr/bin/env node

/**
 * Script de génération d'icons PWA pour ArchiAtech
 * Génère des icons aux formats requis pour PWA et iOS
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/images');

// Tailles d'icons requises
const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

// Couleurs ArchiAtech
const colors = {
  primary: '#E60023',
  secondary: '#1a1a1a',
  white: '#ffffff',
};

/**
 * Génère un icon avec le logo ArchiAtech stylisé
 */
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(1, '#c41f1f');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Ajouter un effet de profondeur avec une ombre
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.05;
  ctx.shadowOffsetX = size * 0.02;
  ctx.shadowOffsetY = size * 0.02;

  // Dessiner le logo/icône (CPU/Chip stylisé)
  const centerX = size / 2;
  const centerY = size / 2;
  const iconSize = size * 0.5;
  
  // Reset shadow for icon
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Dessiner un CPU stylisé
  ctx.fillStyle = colors.white;
  ctx.strokeStyle = colors.white;
  ctx.lineWidth = size * 0.06;

  // Rectangle principal (CPU)
  const rectSize = iconSize * 0.6;
  const rectX = centerX - rectSize / 2;
  const rectY = centerY - rectSize / 2;
  
  // Rounded rectangle
  const radius = size * 0.08;
  ctx.beginPath();
  ctx.moveTo(rectX + radius, rectY);
  ctx.lineTo(rectX + rectSize - radius, rectY);
  ctx.quadraticCurveTo(rectX + rectSize, rectY, rectX + rectSize, rectY + radius);
  ctx.lineTo(rectX + rectSize, rectY + rectSize - radius);
  ctx.quadraticCurveTo(rectX + rectSize, rectY + rectSize, rectX + rectSize - radius, rectY + rectSize);
  ctx.lineTo(rectX + radius, rectY + rectSize);
  ctx.quadraticCurveTo(rectX, rectY + rectSize, rectX, rectY + rectSize - radius);
  ctx.lineTo(rectX, rectY + radius);
  ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
  ctx.closePath();
  ctx.fill();

  // Pins du CPU (lignes sur les côtés)
  const pinLength = iconSize * 0.15;
  const pinWidth = size * 0.04;
  const pinSpacing = rectSize / 4;

  ctx.lineWidth = pinWidth;
  ctx.strokeStyle = colors.white;

  // Pins gauche
  for (let i = 0; i < 3; i++) {
    const y = rectY + pinSpacing * (i + 1);
    ctx.beginPath();
    ctx.moveTo(rectX, y);
    ctx.lineTo(rectX - pinLength, y);
    ctx.stroke();
  }

  // Pins droite
  for (let i = 0; i < 3; i++) {
    const y = rectY + pinSpacing * (i + 1);
    ctx.beginPath();
    ctx.moveTo(rectX + rectSize, y);
    ctx.lineTo(rectX + rectSize + pinLength, y);
    ctx.stroke();
  }

  // Pins haut
  for (let i = 0; i < 3; i++) {
    const x = rectX + pinSpacing * (i + 1);
    ctx.beginPath();
    ctx.moveTo(x, rectY);
    ctx.lineTo(x, rectY - pinLength);
    ctx.stroke();
  }

  // Pins bas
  for (let i = 0; i < 3; i++) {
    const x = rectX + pinSpacing * (i + 1);
    ctx.beginPath();
    ctx.moveTo(x, rectY + rectSize);
    ctx.lineTo(x, rectY + rectSize + pinLength);
    ctx.stroke();
  }

  // Détails intérieurs du CPU
  ctx.fillStyle = colors.primary;
  const innerSize = rectSize * 0.4;
  const innerX = centerX - innerSize / 2;
  const innerY = centerY - innerSize / 2;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Mini cercles décoratifs
  ctx.fillStyle = colors.white;
  const miniCircleRadius = innerSize * 0.12;
  const positions = [
    { x: centerX - innerSize * 0.25, y: centerY - innerSize * 0.25 },
    { x: centerX + innerSize * 0.25, y: centerY - innerSize * 0.25 },
    { x: centerX - innerSize * 0.25, y: centerY + innerSize * 0.25 },
    { x: centerX + innerSize * 0.25, y: centerY + innerSize * 0.25 },
  ];

  positions.forEach(pos => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, miniCircleRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🎨 Génération des icons PWA pour ArchiAtech...\n');

  // Vérifier si canvas est disponible
  try {
    const testCanvas = createCanvas(10, 10);
  } catch (error) {
    console.error('❌ Erreur : Le module "canvas" n\'est pas installé.');
    console.error('   Installez-le avec : npm install --save-dev canvas');
    console.error('\n💡 Alternative : Utilisez un générateur en ligne :');
    console.error('   - https://realfavicongenerator.net/');
    console.error('   - https://www.pwabuilder.com/imageGenerator');
    process.exit(1);
  }

  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Générer chaque taille d'icon
  for (const size of sizes) {
    try {
      console.log(`⏳ Génération de l'icon ${size}x${size}px...`);
      
      const canvas = generateIcon(size);
      const buffer = canvas.toBuffer('image/png');
      const filename = `icon-${size}x${size}.png`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      
      const fileSizeKB = (buffer.length / 1024).toFixed(2);
      console.log(`✅ ${filename} créé (${fileSizeKB} KB)`);
    } catch (error) {
      console.error(`❌ Erreur lors de la génération de l'icon ${size}x${size}:`, error.message);
    }
  }

  console.log('\n✨ Génération terminée !');
  console.log(`📁 Icons sauvegardés dans : ${outputDir}`);
  console.log('\n📋 Prochaines étapes :');
  console.log('   1. Vérifiez les icons générés');
  console.log('   2. Optionnel : Remplacez par votre logo personnalisé');
  console.log('   3. Testez avec : npm run dev');
  console.log('   4. Vérifiez manifest.json dans DevTools');
}

// Exécuter le script
main().catch(console.error);

