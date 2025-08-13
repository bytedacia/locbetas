# 🍽️ Loc8abite - Gioco di Indovinare Cibi e Luoghi

Un gioco educativo e divertente per indovinare cibi e luoghi da tutto il mondo! Testa le tue conoscenze geografiche e culinarie con il design neumorphism moderno.

## 🎮 Caratteristiche

### Food Guess Mode
- **10 Round**: Gioca 10 round per ottenere il punteggio massimo
- **Timer**: Ogni round ha un timer di 60 secondi
- **5 Tentativi**: Hai 5 tentativi per indovinare il paese corretto
- **Mappa Interattiva**: Clicca sui paesi per fare le tue scelte
- **Feedback Visivo**: 
  - 🟢 Verde: Paese corretto
  - 🔴 Rosso: Paese sbagliato
- **Bussola 3D**: Mini-compass per indizi direzionali
- **Sistema di Punteggio**: Punteggio basato su tempo rimanente e tentativi
- **Design Neumorphism**: Interfaccia moderna con effetti 3D

### Funzionalità
- **Leaderboard**: Classifica dei migliori punteggi
- **Statistiche**: Tracciamento delle performance
- **Responsive**: Funziona su desktop e mobile
- **Accesso di Rete**: Giocabile da dispositivi nella stessa rete

## 🚀 Installazione

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn
- PostgreSQL (per il backend)

### Backend
```bash
cd loc8abite-backend
npm install
npm run dev
```

### Frontend
```bash
cd loc8abite-frontend
npm install
npm run dev
```

## 🌐 Accesso

- **Locale**: http://localhost:3000
- **Rete**: http://[TUO_IP]:3000 (per dispositivi nella stessa rete)

## 🛠️ Tecnologie

### Frontend
- **React 18** con TypeScript
- **Vite** per il build system
- **Leaflet** per le mappe interattive
- **CSS Neumorphism** per il design
- **Haversine** per calcoli geografici

### Backend
- **Node.js** con Express
- **TypeScript**
- **PostgreSQL** per il database
- **CORS** per l'accesso cross-origin
- **node-cron** per task schedulati

## 📁 Struttura del Progetto

```
loc8abite-loc8abite-nicko/
├── loc8abite-backend/          # Server Node.js/Express
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── scripts/           # Script per Wikidata
│   │   └── data/              # Dati JSON
│   └── package.json
├── loc8abite-frontend/         # Client React
│   ├── src/
│   │   ├── components/        # Componenti React
│   │   ├── utils/             # Utility functions
│   │   └── assets/            # Risorse statiche
│   └── package.json
└── README.md
```

## 🎯 Come Giocare

1. **Seleziona Modalità**: Scegli "Food Guess Mode"
2. **Indovina il Paese**: Guarda l'immagine del cibo e clicca sul paese corretto
3. **Usa la Bussola**: La mini-compass ti dà indizi sulla direzione
4. **Gestisci il Tempo**: Hai 60 secondi per ogni round
5. **Massimizza il Punteggio**: Meno tentativi e più tempo = punteggio più alto!

## 🔧 Configurazione

### Variabili d'Ambiente (Backend)
Crea un file `.env` nella cartella `loc8abite-backend`:

```env
PORT=4000
HOST=0.0.0.0
DATABASE_URL=postgresql://username:password@localhost:5432/loc8abite
```

### Configurazione Vite (Frontend)
Il file `vite.config.ts` è configurato per:
- Accesso esterno (host: '0.0.0.0')
- Proxy per le API backend
- Porta 3000

## 📊 API Endpoints

### Punteggi
- `POST /api/scores` - Salva un nuovo punteggio
- `GET /api/scores` - Recupera punteggi

### Dati del Gioco
- `GET /api/wikidata/food` - Dati cibi
- `GET /api/wikidata/places` - Dati luoghi

## 🎨 Design System

Il progetto utilizza il design **Neumorphism** con:
- Ombre morbide e effetti 3D
- Gradienti sottili
- Bordi arrotondati
- Colori neutri e moderni
- Animazioni fluide

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 🙏 Ringraziamenti

- **Wikidata** per i dati geografici e culinari
- **Leaflet** per le mappe interattive
- **React** per il framework frontend
- **Express** per il framework backend

---

**Divertiti a giocare con Loc8abite! 🌍🍽️**
