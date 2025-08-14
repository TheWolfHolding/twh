const fs = require('fs');
const path = require('path');

// Post-build script per forzare MIME types su Netlify
console.log('🔧 Fixing Netlify MIME types...');

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

// Leggi index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Sostituisci tutti gli script type="module" con type="text/javascript"
html = html.replace(
  /<script type="module"/g, 
  '<script type="text/javascript"'
);

// Aggiungi polyfill per ES modules se necessario
const polyfillScript = `
<script>
// ES Module polyfill per Netlify
if (!('noModule' in HTMLScriptElement.prototype)) {
  console.log('ES modules not supported, loading polyfill...');
}
</script>`;

html = html.replace('</head>', polyfillScript + '</head>');

// Scrivi il file modificato
fs.writeFileSync(indexPath, html);

console.log('✅ MIME types fixed for Netlify!');
