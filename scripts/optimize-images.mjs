#!/usr/bin/env node

/**
 * Script d'optimisation des images ArchiAtech
 * - Conversion en WebP
 * - Compression
 * - Redimensionnement responsive
 * - Génération de thumbnails
 */

import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

const CONFIG = {
  inputDir: 'public/images',
  outputDir: 'public/images/optimized',
  qualities: {
    webp: 85,
    jpeg: 85,
    png: 90
  },
  sizes: [
    { name: 'thumbnail', width: 320 },
    { name: 'small', width: 640 },
    { name: 'medium', width: 1024 },
    { name: 'large', width: 1920 },
    { name: 'original', width: null }
  ],
  supportedFormats: ['.jpg', '.jpeg', '.png'],
  skipFiles: ['.DS_Store', 'Thumbs.db']
};

// Couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

/**
 * Récupérer toutes les images du dossier
 */
async function getImages(dir) {
  const images = [];
  
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      if (CONFIG.skipFiles.includes(file)) continue;
      
      const fullPath = join(dir, file);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        // Récursif pour les sous-dossiers
        const subImages = await getImages(fullPath);
        images.push(...subImages);
      } else {
        const ext = extname(file).toLowerCase();
        if (CONFIG.supportedFormats.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    log.error(`Erreur lors de la lecture du dossier ${dir}: ${error.message}`);
  }
  
  return images;
}

/**
 * Obtenir les métadonnées d'une image
 */
async function getImageMetadata(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    const stats = await stat(imagePath);
    
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: stats.size,
      sizeKb: (stats.size / 1024).toFixed(2)
    };
  } catch (error) {
    log.error(`Erreur métadonnées pour ${imagePath}: ${error.message}`);
    return null;
  }
}

/**
 * Optimiser une image
 */
async function optimizeImage(imagePath, outputDir) {
  const name = basename(imagePath, extname(imagePath));
  const results = [];
  
  try {
    // Créer le dossier de sortie si nécessaire
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }
    
    // Métadonnées originales
    const originalMeta = await getImageMetadata(imagePath);
    if (!originalMeta) return results;
    
    log.info(`Optimisation de ${basename(imagePath)} (${originalMeta.width}x${originalMeta.height}, ${originalMeta.sizeKb}KB)`);
    
    // Générer différentes tailles
    for (const size of CONFIG.sizes) {
      const width = size.width || originalMeta.width;
      
      // Sauter si la taille demandée est plus grande que l'original
      if (width > originalMeta.width) continue;
      
      // WebP
      const webpPath = join(outputDir, `${name}-${size.name}.webp`);
      await sharp(imagePath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: CONFIG.qualities.webp })
        .toFile(webpPath);
      
      const webpMeta = await getImageMetadata(webpPath);
      if (webpMeta) {
        results.push({
          format: 'webp',
          size: size.name,
          path: webpPath,
          savings: ((1 - webpMeta.size / originalMeta.size) * 100).toFixed(1)
        });
      }
      
      // JPEG/PNG original optimisé
      const ext = originalMeta.format;
      const optimizedPath = join(outputDir, `${name}-${size.name}.${ext}`);
      
      if (ext === 'jpeg' || ext === 'jpg') {
        await sharp(imagePath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: CONFIG.qualities.jpeg, progressive: true })
          .toFile(optimizedPath);
      } else if (ext === 'png') {
        await sharp(imagePath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png({ quality: CONFIG.qualities.png, compressionLevel: 9 })
          .toFile(optimizedPath);
      }
      
      const optimizedMeta = await getImageMetadata(optimizedPath);
      if (optimizedMeta) {
        results.push({
          format: ext,
          size: size.name,
          path: optimizedPath,
          savings: ((1 - optimizedMeta.size / originalMeta.size) * 100).toFixed(1)
        });
      }
    }
    
    log.success(`Optimisé: ${basename(imagePath)} → ${results.length} versions`);
    
  } catch (error) {
    log.error(`Erreur optimisation ${imagePath}: ${error.message}`);
  }
  
  return results;
}

/**
 * Fonction principale
 */
async function main() {
  log.header('🖼️  OPTIMISATION DES IMAGES ARCHIATECH');
  
  const startTime = Date.now();
  
  // Vérifier si le dossier d'entrée existe
  if (!existsSync(CONFIG.inputDir)) {
    log.error(`Le dossier ${CONFIG.inputDir} n'existe pas`);
    process.exit(1);
  }
  
  // Récupérer toutes les images
  log.info('Recherche des images...');
  const images = await getImages(CONFIG.inputDir);
  
  if (images.length === 0) {
    log.warning('Aucune image trouvée');
    process.exit(0);
  }
  
  log.success(`${images.length} image(s) trouvée(s)`);
  
  // Optimiser chaque image
  let totalResults = [];
  for (const imagePath of images) {
    const results = await optimizeImage(imagePath, CONFIG.outputDir);
    totalResults = totalResults.concat(results);
  }
  
  // Statistiques finales
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgSavings = totalResults.length > 0
    ? (totalResults.reduce((sum, r) => sum + parseFloat(r.savings), 0) / totalResults.length).toFixed(1)
    : 0;
  
  log.header('📊 RÉSUMÉ');
  log.success(`Images optimisées: ${images.length}`);
  log.success(`Versions générées: ${totalResults.length}`);
  log.success(`Économie moyenne: ${avgSavings}%`);
  log.success(`Durée: ${duration}s`);
  log.info(`Dossier de sortie: ${CONFIG.outputDir}`);
  
  console.log('\n✨ Optimisation terminée avec succès!\n');
}

// Exécution
main().catch((error) => {
  log.error(`Erreur fatale: ${error.message}`);
  console.error(error);
  process.exit(1);
});
