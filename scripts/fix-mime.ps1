# Fix MIME types per Netlify - Rinomina .js in .mjs
Write-Host "🔧 Fixing MIME types for Netlify..." -ForegroundColor Green

$distDir = ".\dist"
$jsDir = "$distDir\assets\js"
$indexPath = "$distDir\index.html"

if (Test-Path $jsDir) {
    # Trova tutti i file .js
    $jsFiles = Get-ChildItem $jsDir -Filter "*.js"
    
    # Leggi il contenuto di index.html
    $indexContent = Get-Content $indexPath -Raw
    
    foreach ($file in $jsFiles) {
        $oldName = $file.Name
        $newName = $oldName -replace "\.js$", ".mjs"
        $oldPath = $file.FullName
        $newPath = Join-Path $jsDir $newName
        
        # Rinomina il file
        Rename-Item $oldPath $newPath
        Write-Host "✅ Renamed: $oldName → $newName" -ForegroundColor Yellow
        
        # Aggiorna i riferimenti nell'index.html
        $indexContent = $indexContent -replace "/assets/js/$oldName", "/assets/js/$newName"
    }
    
    # Salva l'index.html aggiornato
    Set-Content $indexPath $indexContent -NoNewline
    Write-Host "✅ Updated index.html references" -ForegroundColor Yellow
}

Write-Host "🎉 MIME type fix completed!" -ForegroundColor Green
