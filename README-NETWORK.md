# 🌐 Loc8abite - Modalità Rete

Questo documento spiega come avviare Loc8abite in modalità rete per permettere l'accesso da altri dispositivi.

## 🚀 Avvio Rapido

### Opzione 1: Script Automatico (Raccomandato)

1. **Doppio click** su `start-network.bat` (Windows)
2. Oppure esegui `start-network.ps1` in PowerShell

### Opzione 2: Avvio Manuale

#### 1. Avvia il Backend
```bash
cd loc8abite-backend
npm run dev
```

#### 2. Avvia il Frontend (in un nuovo terminale)
```bash
cd loc8abite-frontend
npm run dev
```

## 📱 Accesso da Altri Dispositivi

### Trova il tuo IP
```bash
# Windows
ipconfig

# Cerca la riga "IPv4 Address" sotto la tua connessione WiFi/Ethernet
# Esempio: 192.168.1.100
```

### URL di Accesso
- **Locale**: `http://localhost:3000`
- **Rete**: `http://[TUO_IP]:3000`
- **Esempio**: `http://192.168.1.100:3000`

## 🔧 Configurazione

### Backend (Porta 4000)
- **Host**: `0.0.0.0` (tutti gli IP)
- **Porta**: `4000`
- **Accesso**: `http://[TUO_IP]:4000`

### Frontend (Porta 3000)
- **Host**: `0.0.0.0` (tutti gli IP)
- **Porta**: `3000`
- **Proxy**: `/api` → `http://localhost:4000`

## 🛡️ Sicurezza

⚠️ **Attenzione**: Questa configurazione rende il server accessibile a tutti i dispositivi nella stessa rete WiFi.

### Raccomandazioni:
1. **Usa solo su reti fidate** (casa, ufficio)
2. **Non esporre su Internet** senza firewall
3. **Ferma i servizi** quando non servono

## 🛠️ Risoluzione Problemi

### Errore "Porta già in uso"
```bash
# Trova il processo che usa la porta
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Termina il processo
taskkill /PID [NUMERO_PROCESSO] /F
```

### Firewall Windows
Se non riesci ad accedere da altri dispositivi:
1. Apri "Windows Defender Firewall"
2. Permetti l'accesso per Node.js
3. Oppure disabilita temporaneamente il firewall

### Dispositivo non trova il server
1. **Verifica IP**: Assicurati di usare l'IP corretto
2. **Stessa rete**: Entrambi i dispositivi devono essere sulla stessa WiFi
3. **Firewall**: Controlla le impostazioni firewall
4. **Antivirus**: Alcuni antivirus bloccano le connessioni

## 📋 Checklist

- [ ] Backend avviato su porta 4000
- [ ] Frontend avviato su porta 3000
- [ ] IP del computer identificato
- [ ] Test accesso locale: `http://localhost:3000`
- [ ] Test accesso rete: `http://[TUO_IP]:3000`
- [ ] Firewall configurato (se necessario)

## 🎮 Goditi il Gioco!

Una volta configurato, potrai condividere il link con amici e familiari sulla stessa rete WiFi per giocare insieme a Loc8abite! 🎯
