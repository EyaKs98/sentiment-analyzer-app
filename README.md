# 💬 Analyseur de sentiment — avis clients & tickets

Application web qui classe automatiquement une liste d'avis clients ou de tickets support
en Positif / Neutre / Négatif, via un modèle de langage pré-entraîné (aucun entraînement requis).

## Fonctionnalités
- Analyse de plusieurs avis en une seule requête (un par ligne)
- Classification automatique : 🟢 Positif / ⚪ Neutre / 🔴 Négatif
- Score de confiance affiché pour chaque résultat
- Fonctionne en français (modèle multilingue)

## Aperçu

### Avis positif



### Avis neutre



### Avis négatif

<img width="1096" height="660" alt="screenshot-negatif png" src="https://github.com/user-attachments/assets/dfe6ced6-e1a5-4c5d-aff1-992158fd8f06" />



## Stack technique
| Côté | Techno |
|---|---|
| Frontend | Angular 17 (standalone components) |
| Backend | Node.js, Express |
| IA | Hugging Face Inference API — modèle `nlptown/bert-base-multilingual-uncased-sentiment` |

## Installation

### Prérequis
- Node.js 18 ou plus récent
- Un compte gratuit sur [huggingface.co](https://huggingface.co)

### 1. Obtenir une clé API
- Aller sur huggingface.co → **Settings** → **Access Tokens**
- Cliquer sur **New token**, choisir le rôle **Read**, copier la clé générée

### 2. Lancer le backend

Ouvrir un terminal et exécuter ces commandes une par une :

\`\`\`bash
cd server
\`\`\`

\`\`\`bash
npm install
\`\`\`

\`\`\`bash
cp .env.example .env
\`\`\`

Ouvrir le fichier `.env` qui vient d'être créé, et remplacer la valeur d'exemple par la clé obtenue à l'étape 1.

\`\`\`bash
npm start
\`\`\`

Le backend est alors disponible sur `http://localhost:3001`.

### 3. Lancer le frontend

Dans un **second terminal** :

\`\`\`bash
cd client
\`\`\`

\`\`\`bash
npm install
\`\`\`

\`\`\`bash
npm start
\`\`\`

L'application est alors disponible sur `http://localhost:4200`.

## Utilisation
1. Ouvrir `http://localhost:4200`
2. Coller une liste d'avis, un par ligne
3. Cliquer sur **Analyser**
4. Chaque avis s'affiche avec son étiquette de sentiment et son score de confiance
