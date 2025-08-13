@echo off
echo ========================================
echo    LOC8ABITE - AVVIO MODALITA' RETE
echo ========================================
echo.

echo 🚀 Avvio del backend...
cd loc8abite-backend
start "Backend Server" cmd /k "npm run dev"

echo.
echo ⏳ Attendo 3 secondi per l'avvio del backend...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Avvio del frontend...
cd ..\loc8abite-frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo ✅ SERVIZI AVVIATI!
echo ========================================
echo.
echo 📱 Per accedere da altri dispositivi:
echo    1. Trova l'IP del tuo computer
echo    2. Usa: http://[TUO_IP]:3000
echo.
echo 🔍 Per trovare il tuo IP, esegui: ipconfig
echo.
echo ⏹️  Premi CTRL+C per fermare i servizi
echo ========================================
pause
