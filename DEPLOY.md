# 🚀 Guida al Deploy di Loc8abite

## Opzioni di Hosting Gratuito

### 1. Railway (Raccomandato) 🚂

**Vantaggi:**
- 500 ore gratuite al mese
- PostgreSQL incluso
- Deploy automatico da GitHub
- Frontend e backend sullo stesso servizio

**Passi per il Deploy:**

1. **Crea account su Railway:**
   - Vai su [railway.app](https://railway.app)
   - Registrati con GitHub

2. **Connetti il repository:**
   - Clicca "New Project"
   - Seleziona "Deploy from GitHub repo"
   - Scegli il tuo repository `loc8abite-loc8abite-nicko`

3. **Configura le variabili d'ambiente:**
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://... (Railway lo genera automaticamente)
   ```

4. **Deploy automatico:**
   - Railway rileverà automaticamente la configurazione
   - Il deploy inizierà automaticamente

### 2. Render 🌐

**Vantaggi:**
- Hosting gratuito per servizi web
- PostgreSQL gratuito (90 giorni)
- Deploy automatico

**Passi per il Deploy:**

1. **Crea account su Render:**
   - Vai su [render.com](https://render.com)
   - Registrati con GitHub

2. **Crea nuovo Web Service:**
   - Clicca "New +" → "Web Service"
   - Connetti il repository GitHub

3. **Configura il servizio:**
   - **Name:** `loc8abite`
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

4. **Variabili d'ambiente:**
   ```env
   NODE_ENV=production
   PORT=10000
   ```

## 📁 File di Configurazione Creati

- `railway.json` - Configurazione Railway
- `render.yaml` - Configurazione Render
- `package.json` - Script di build e start
- `loc8abite-backend/src/app.ts` - Servizio file statici

## 🔧 Configurazione Database

### Opzione 1: Database su Railway/Render
- Il database PostgreSQL viene creato automaticamente
- La variabile `DATABASE_URL` viene impostata automaticamente

### Opzione 2: Supabase (Alternativa)
1. Crea account su [supabase.com](https://supabase.com)
2. Crea nuovo progetto
3. Copia la connection string
4. Aggiungi come variabile d'ambiente `DATABASE_URL`

## 🌐 Accesso all'Applicazione

Dopo il deploy, riceverai un URL come:
- Railway: `https://loc8abite-production.up.railway.app`
- Render: `https://loc8abite.onrender.com`

## 📊 Monitoraggio

- **Railway:** Dashboard integrata con metriche
- **Render:** Logs e metriche disponibili nel dashboard

## 🔄 Deploy Automatico

Entrambe le piattaforme supportano deploy automatico:
- Ogni push su `main` triggera un nuovo deploy
- I deploy sono automatici e veloci

## 🛠️ Troubleshooting

### Problemi Comuni:

1. **Build fallisce:**
   - Verifica che Node.js sia versione 16+
   - Controlla i log di build

2. **Database non connesso:**
   - Verifica la variabile `DATABASE_URL`
   - Controlla che il database sia attivo

3. **Frontend non caricato:**
   - Verifica che il build del frontend sia completato
   - Controlla i path dei file statici

### Logs Utili:
```bash
# Railway
railway logs

# Render
# Disponibili nel dashboard web
```

## 🎯 Prossimi Passi

1. Scegli la piattaforma (Railway raccomandato)
2. Segui i passi di deploy
3. Configura il database
4. Testa l'applicazione online
5. Condividi l'URL con gli utenti!

---

**Buon deploy! 🚀**
