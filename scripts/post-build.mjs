import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const assetsJsDir = path.join(distDir, 'assets/js');

console.log('🔧 Post-build: Fixing MIME types for Netlify...');

// Leggi index.html
const indexPath = path.join(distDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Trova tutti i file .js nella directory assets/js
if (fs.existsSync(assetsJsDir)) {
  const jsFiles = fs.readdirSync(assetsJsDir).filter(file => file.endsWith('.js'));
  
  jsFiles.forEach(file => {
    const oldPath = path.join(assetsJsDir, file);
    const newFile = file.replace('.js', '.mjs');
    const newPath = path.join(assetsJsDir, newFile);
    
    // Rinomina il file
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Renamed: ${file} → ${newFile}`);
    
    // Aggiorna i riferimenti nell'index.html
    indexContent = indexContent.replace(
      new RegExp(`/assets/js/${file}`, 'g'),
      `/assets/js/${newFile}`
    );
  });
  
  // Salva l'index.html aggiornato
  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ Updated index.html references');
}

console.log('🎉 Post-build completed!');
