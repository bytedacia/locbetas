import express from "express";
import cors from "cors";
import wikidataRoute from "./routes/wikidata";

const app = express();

// Configurazione CORS per accesso da Internet
app.use(cors({
  origin: '*', // Permette accesso da qualsiasi dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use("/api/wikidata", wikidataRoute);

export default app;
