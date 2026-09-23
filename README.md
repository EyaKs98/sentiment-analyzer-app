# 💬 Analyseur de sentiment — avis clients & tickets

Application web qui classe automatiquement une liste d'avis clients ou de tickets support
en Positif / Neutre / Négatif, via un modèle de langage pré-entraîné (aucun entraînement requis).

## Aperçu

### Avis positif

<img width="1052" height="651" alt="image" src="https://github.com/user-attachments/assets/5bb947c8-62e2-4b91-a46d-e03ee7ec4492" />


### Avis neutre
<img width="1115" height="627" alt="image" src="https://github.com/user-attachments/assets/be7fdc15-d836-4da5-ad8b-368af8d88366" />


### Avis négatif
<img width="1096" height="660" alt="image" src="https://github.com/user-attachments/assets/090a209d-f68c-454b-aafc-999c94faa627" />



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
