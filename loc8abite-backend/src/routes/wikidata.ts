import express from "express";
import { GameDataService } from "../services/gameDataService";

const router = express.Router();

// Ottieni tutti i luoghi
router.get("/places", async (req, res) => {
  try {
    const places = await GameDataService.loadPlacesData();
    res.json({
      success: true,
      data: places,
      total: places.length
    });
  } catch (error) {
    console.error("❌ Errore nel recupero luoghi:", error);
    res.status(500).json({ 
      error: "Errore interno del server nel recupero dei luoghi" 
    });
  }
});

// Ottieni tutti i cibi
router.get("/food", async (req, res) => {
  try {
    const food = await GameDataService.loadFoodData();
    res.json({
      success: true,
      data: food,
      total: food.length
    });
  } catch (error) {
    console.error("❌ Errore nel recupero cibi:", error);
    res.status(500).json({ 
      error: "Errore interno del server nel recupero dei cibi" 
    });
  }
});

// Ottieni un luogo casuale
router.get("/places/random", async (req, res) => {
  try {
    const place = await GameDataService.getRandomPlace();
    if (!place) {
      return res.status(404).json({ 
        error: "Nessun luogo disponibile" 
      });
    }
    res.json({
      success: true,
      data: place
    });
  } catch (error) {
    console.error("❌ Errore nell'ottenimento luogo casuale:", error);
    res.status(500).json({ 
      error: "Errore interno del server nell'ottenimento del luogo casuale" 
    });
  }
});

// Ottieni un cibo casuale
router.get("/food/random", async (req, res) => {
  try {
    const food = await GameDataService.getRandomFood();
    if (!food) {
      return res.status(404).json({ 
        error: "Nessun cibo disponibile" 
      });
    }
    res.json({
      success: true,
      data: food
    });
  } catch (error) {
    console.error("❌ Errore nell'ottenimento cibo casuale:", error);
    res.status(500).json({ 
      error: "Errore interno del server nell'ottenimento del cibo casuale" 
    });
  }
});

// Ottieni luoghi per paese
router.get("/places/country/:country", async (req, res) => {
  try {
    const { country } = req.params;
    const places = await GameDataService.getPlacesByCountry(country);
    res.json({
      success: true,
      country,
      data: places,
      total: places.length
    });
  } catch (error) {
    console.error("❌ Errore nel recupero luoghi per paese:", error);
    res.status(500).json({ 
      error: "Errore interno del server nel recupero dei luoghi per paese" 
    });
  }
});

// Ottieni cibi per paese
router.get("/food/country/:country", async (req, res) => {
  try {
    const { country } = req.params;
    const food = await GameDataService.getFoodByCountry(country);
    res.json({
      success: true,
      country,
      data: food,
      total: food.length
    });
  } catch (error) {
    console.error("❌ Errore nel recupero cibi per paese:", error);
    res.status(500).json({ 
      error: "Errore interno del server nel recupero dei cibi per paese" 
    });
  }
});

// Ricarica i dati del gioco (admin)
router.post("/reload", async (req, res) => {
  try {
    await GameDataService.reloadGameData();
    res.json({
      success: true,
      message: "Dati del gioco ricaricati con successo"
    });
  } catch (error) {
    console.error("❌ Errore nel ricaricamento dati:", error);
    res.status(500).json({ 
      error: "Errore interno del server nel ricaricamento dei dati" 
    });
  }
});

// Pulisci la cache dei dati del gioco (admin)
router.delete("/cache", async (req, res) => {
  try {
    await GameDataService.clearGameDataCache();
    res.json({
      success: true,
      message: "Cache dati gioco pulita con successo"
    });
  } catch (error) {
    console.error("❌ Errore nella pulizia cache:", error);
    res.status(500).json({ 
      error: "Errore interno del server nella pulizia della cache" 
    });
  }
});

export default router;
