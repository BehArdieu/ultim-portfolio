# ✅ Gestionnaire de Tâches - React + TypeScript + Tailwind

Une application moderne de gestion de tâches construite avec React, TypeScript et Tailwind CSS.

## 🌟 Fonctionnalités

### ✨ Gestion des tâches
- ✅ Ajouter, modifier et supprimer des tâches
- 🔄 Marquer comme terminée/active
- 📝 Titre et description pour chaque tâche
- 🎯 Système de priorités (Faible, Moyenne, Haute)
- 🏷️ Catégorisation des tâches

### 🔍 Filtres et organisation
- 📊 Statistiques en temps réel
- 🔍 Filtrage par statut (Toutes/Actives/Terminées)
- 🎯 Filtrage par priorité
- 🏷️ Filtrage par catégorie
- 🗑️ Suppression en masse des tâches terminées

### 💾 Persistance
- 🔄 Sauvegarde automatique dans localStorage
- 📱 Données conservées entre les sessions

### 🎨 Interface utilisateur
- 📱 Design responsive (mobile-first)
- 🎨 Interface moderne avec Tailwind CSS
- ⚡ Interactions fluides et animations
- 🖱️ Edition en ligne des tâches

## 🛠 Technologies utilisées

- **React 18** - Bibliothèque UI moderne
- **TypeScript** - JavaScript typé pour plus de robustesse
- **Tailwind CSS** - Framework CSS utilitaire
- **@tailwindcss/forms** - Styles pour les formulaires
- **Custom Hooks** - Logique réutilisable

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### Installation
```bash
# Cloner le repository principal
git clone <repository-url>

# Naviguer vers le projet
cd frontend/todo-app

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Scripts disponibles
```bash
npm start          # Mode développement
npm run build      # Build de production
npm test           # Lancer les tests
npm run eject      # Ejecter la configuration CRA
```

## 🚀 Déploiement

### 🎯 Déploiement rapide avec le script automatique

```bash
# Script de déploiement interactif
./deploy.sh

# Ou directement avec une plateforme
./deploy.sh netlify   # Déployer sur Netlify
./deploy.sh vercel    # Déployer sur Vercel
./deploy.sh railway   # Déployer sur Railway
./deploy.sh docker    # Créer une image Docker
./deploy.sh local     # Serveur local pour test
```

### 🌐 Déploiement sur les plateformes cloud

#### Netlify (Recommandé)
- Configuration automatique via `netlify.toml`
- Redirections SPA configurées
- Headers de sécurité optimisés
- Cache des assets (1 an)

#### Vercel
- Configuration automatique via `vercel.json`
- Optimisations React intégrées
- CDN global
- Déploiement instantané

#### Railway
- Configuration automatique via `railway.toml`
- Déploiement depuis Git
- HTTPS automatique
- Monitoring intégré

### 🐳 Déploiement avec Docker

#### Build local
```bash
# Construire l'image
docker build -t todo-app .

# Lancer le conteneur
docker run -p 3000:80 --name todo-app todo-app
```

#### Avec Docker Compose
```bash
# Lancement complet
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

### 🔄 CI/CD automatique

Le pipeline GitHub Actions (`.github/workflows/deploy.yml`) déploie automatiquement :

- ✅ Tests automatisés
- 🏗️ Build de production  
- 🐳 Image Docker sur Docker Hub
- 🌐 Déploiement sur Netlify
- 🚂 Déploiement sur Railway

**Configuration requise :**
```
# GitHub Secrets
DOCKER_USERNAME=votre-username
DOCKER_PASSWORD=votre-token
NETLIFY_AUTH_TOKEN=votre-token
NETLIFY_SITE_ID=votre-site-id
RAILWAY_TOKEN=votre-token
```

## 📁 Structure du projet

```
src/
├── components/           # Composants React
│   ├── AddTodoForm.tsx  # Formulaire d'ajout
│   ├── TodoItem.tsx     # Élément de tâche
│   └── TodoFilters.tsx  # Filtres et statistiques
├── hooks/               # Hooks personnalisés
│   └── useTodos.ts      # Logique de gestion des tâches
├── types/               # Types TypeScript
│   └── Todo.ts          # Interfaces et types
├── App.tsx              # Composant principal
├── index.tsx            # Point d'entrée
└── index.css            # Styles Tailwind
```

## 📦 Fichiers de configuration

### Déploiement
- `Dockerfile` - Configuration Docker multi-stage
- `docker-compose.yml` - Orchestration des services
- `nginx.conf` - Configuration serveur web optimisée
- `netlify.toml` - Configuration Netlify avec optimisations
- `vercel.json` - Configuration Vercel avec cache
- `railway.toml` - Configuration Railway

### Variables d'environnement
- `.env.example` - Template des variables
- `.env.development` - Variables de développement
- `.env.production` - Variables de production

### CI/CD
- `.github/workflows/deploy.yml` - Pipeline de déploiement automatique

## 🎯 Concepts démontrés

### React & TypeScript
- Composants fonctionnels avec TypeScript
- Hooks personnalisés (useState, useEffect, useMemo)
- Gestion d'état locale
- Props typées et interfaces

### Gestion d'état
- Hook personnalisé `useTodos` pour la logique métier
- Persistance avec localStorage
- État dérivé avec useMemo pour les performances

### UI/UX
- Design system cohérent avec Tailwind
- Composants réutilisables
- États interactifs (hover, focus, disabled)
- Formulaires avec validation

### DevOps & Déploiement
- Conteneurisation Docker optimisée
- Configuration multi-plateforme
- CI/CD automatisé
- Monitoring et health checks

### Bonnes pratiques
- Séparation des responsabilités
- Types TypeScript stricts
- Code modulaire et réutilisable
- Performance optimisée
- Sécurité (CSP, headers, validation)

## 🔮 Évolutions possibles

- [ ] Mode sombre
- [ ] Glisser-déposer pour réorganiser
- [ ] Dates d'échéance
- [ ] Recherche textuelle
- [ ] Export/Import des données
- [ ] Synchronisation cloud
- [ ] Notifications push
- [ ] Collaboration multi-utilisateurs

## 🐛 Tests

```bash
npm test                 # Lancer tous les tests
npm test -- --coverage  # Avec couverture de code
npm test -- --watch     # Mode watch
```

## 🛠 Dépannage

### Problèmes courants

#### Build échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

#### Docker ne démarre pas
```bash
# Vérifier les logs
docker-compose logs todo-app

# Rebuild sans cache
docker-compose build --no-cache
```

#### Problèmes de routes (SPA)
- Vérifiez que les redirections sont configurées
- Les fichiers `netlify.toml` et `vercel.json` gèrent cela automatiquement

### Support

Consultez le [guide de déploiement complet](../../DEPLOY.md) pour plus de détails.

## 📄 Licence

Ce projet fait partie du portfolio [ultim-portfolio](../../README.md) et est destiné à des fins éducatives et de démonstration.

---

**Développé avec ❤️ pour démontrer les compétences en développement React moderne et DevOps**
