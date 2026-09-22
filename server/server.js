// server.js — API Node/Express qui classe des avis/tickets par sentiment via Hugging Face
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const HF_MODEL = 'nlptown/bert-base-multilingual-uncased-sentiment';
const HF_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;

if (!process.env.HF_API_KEY) {
  console.warn('⚠️  HF_API_KEY manquante — crée un fichier .env à partir de .env.example');
}

// Convertit la note (1 à 5 étoiles) renvoyée par le modèle en catégorie simple
function starsToSentiment(label) {
  const stars = parseInt(label[0], 10); // ex: "5 stars" -> 5
  if (stars <= 2) return { sentiment: 'negatif', emoji: '🔴' };
  if (stars === 3) return { sentiment: 'neutre', emoji: '⚪' };
  return { sentiment: 'positif', emoji: '🟢' };
}

async function classifyOne(text) {
  const response = await fetch(HF_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text }),
  });

  const data = await response.json();

  // Le modèle peut être "en cours de chargement" au premier appel (cold start)
  if (data.error) {
    throw new Error(data.error);
  }

  // data[0] est un tableau de { label, score } trié par score décroissant
  const best = data[0].reduce((a, b) => (a.score > b.score ? a : b));
  const { sentiment, emoji } = starsToSentiment(best.label);

  return { text, sentiment, emoji, confidence: Math.round(best.score * 100) };
}

/**
 * POST /api/classify
 * body: { texts: string[] }  — une entrée par avis/ticket
 * réponse: { results: [{ text, sentiment, emoji, confidence }] }
 */
app.post('/api/classify', async (req, res) => {
  const { texts } = req.body;

  if (!Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ error: 'Le champ "texts" doit être un tableau non vide.' });
  }

  try {
    const results = await Promise.all(texts.map((t) => classifyOne(t)));
    res.json({ results });
  } catch (err) {
    console.error('Erreur Hugging Face :', err.message);
    res.status(500).json({
      error:
        "Erreur lors de l'appel à Hugging Face. Si c'est le premier appel, le modèle met parfois 20-30s à se charger — réessaie.",
    });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
