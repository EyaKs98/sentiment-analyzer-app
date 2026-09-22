# 💬 Analyseur de sentiment — avis clients & tickets

Application web qui classe automatiquement une liste d'avis clients ou de tickets support
en Positif / Neutre / Négatif, via un modèle de langage pré-entraîné (aucun entraînement requis).

## Fonctionnalités
- Analyse de plusieurs avis en une seule requête (un par ligne)
- Classification automatique : 🟢 Positif / ⚪ Neutre / 🔴 Négatif
- Score de confiance affiché pour chaque résultat
- Fonctionne en français (modèle multilingue)

## Stack technique
| Côté | Techno |
|---|---|
| Frontend | Angular 17 (standalone components) |
| Backend | Node.js, Express |
| IA | Hugging Face Inference API — modèle `nlptown/bert-base-multilingual-uncased-sentiment` |

## Installation

### Prérequis
- Node.js 18+
- Une clé API Hugging Face gratuite : créer un compte sur huggingface.co → Settings → Access Tokens → New token (rôle "Read")

### Backend
\`\`\`bash
cd server
npm install
cp .env.example .env
npm start
\`\`\`
Ouvrir le fichier `.env` créé et remplacer la valeur d'exemple par la clé Hugging Face obtenue à l'étape précédente.
API disponible sur `http://localhost:3001`.

### Frontend
\`\`\`bash
cd client
npm install
npm start
\`\`\`
Application disponible sur `http://localhost:4200`.

## Utilisation
1. Ouvrir `http://localhost:4200`
2. Coller une liste d'avis, un par ligne
3. Cliquer sur **Analyser**
4. Chaque avis s'affiche avec son étiquette de sentiment et son score de confiance