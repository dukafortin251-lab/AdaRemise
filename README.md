# La Remise — Application de gestion de ressourcerie

La Remise est une ressourcerie associative. Cette application permet aux bénévoles de gérer les objets collectés, les dépôts, et de visualiser les indicateurs de l'association via le tableau de bord.

## Ce que fait l'application

- **Page d'accueil** : liste des bénévoles avec sélection pour accéder au tableau de bord
- **Tableau de bord** : indicateurs clés (poids total reçu, objets par statut, objets en rayon) et présentation de l'association
- **Inventaire** : liste des objets filtrables par statut et par catégorie, possibilité de cliquer une fiche objet pour obtenir plus d'information sur l'objet en question et de mettre à jour le statut de l'objet
- **Dépôts** : liste des dépôts enregistrés avec possibilité d'en créer de nouveaux et d'ajouter un nouvel objet à un dépôt existant

## Stack

- **Backend** : Node.js / Express + PostgreSQL + Docker + Swagger
- **Frontend** : React (Vite) + react-router-dom

## Lancer le projet 

### Prérequis
- Node.js installé
- Docker

### Installation

```bash
# 1. Cloner le repo et installer les dépendances
git clone https://github.com/dukafortin251-lab/AdaRemise.git && cd AdaRemise
npm install && cd front-react && npm install && cd ..

# 2. Lancer le backend (depuis la racine)
cd back-end && npm run dev

# 3. Lancer le frontend (dans un autre terminal)
cd front-react && npm run dev
```

L'application est accessible sur `http://localhost:5173`.
L'API tourne sur `http://localhost:3000/api`.
