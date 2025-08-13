# Loc8abite - Avvio Modalità Rete
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    LOC8ABITE - AVVIO MODALITA' RETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ottieni l'IP del computer
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*"} | Select-Object -First 1).IPAddress

Write-Host "🚀 Avvio del backend..." -ForegroundColor Green
Set-Location "loc8abite-backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "⏳ Attendo 3 secondi per l'avvio del backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🌐 Avvio del frontend..." -ForegroundColor Green
Set-Location "..\loc8abite-frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ SERVIZI AVVIATI!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Per accedere da altri dispositivi:" -ForegroundColor Yellow
Write-Host "   1. Usa l'IP del tuo computer: $ipAddress" -ForegroundColor White
Write-Host "   2. URL: http://$ipAddress`:3000" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Accesso locale: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "⏹️  Premi CTRL+C per fermare i servizi" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Premi INVIO per chiudere"
