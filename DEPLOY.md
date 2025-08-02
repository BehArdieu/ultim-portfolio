# 🚀 Guide de Déploiement - Todo App

Ce guide vous accompagne pour déployer l'application Todo App sur différentes plateformes.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Déploiement local avec Docker](#déploiement-local-avec-docker)
3. [Déploiement sur Netlify](#déploiement-sur-netlify)
4. [Déploiement sur Vercel](#déploiement-sur-vercel)
5. [Déploiement sur Railway](#déploiement-sur-railway)
6. [Déploiement avec Docker Hub](#déploiement-avec-docker-hub)
7. [CI/CD avec GitHub Actions](#cicd-avec-github-actions)
8. [Variables d'environnement](#variables-denvironnement)
9. [Dépannage](#dépannage)

## 🔧 Prérequis

- Node.js 18+ 
- Docker (optionnel)
- Git
- Compte sur la plateforme de déploiement choisie

## 🐳 Déploiement local avec Docker

### 1. Build et lancement rapide

```bash
# Naviguer vers le projet
cd frontend/todo-app

# Build et lancement avec Docker Compose
docker-compose up -d

# L'application sera disponible sur http://localhost:3000
```

### 2. Build manuel

```bash
# Build de l'image
docker build -t todo-app .

# Lancement du conteneur
docker run -p 3000:80 --name todo-app todo-app
```

### 3. Vérification

```bash
# Vérifier les logs
docker-compose logs -f todo-app

# Vérifier le statut
docker-compose ps
```

## 🌐 Déploiement sur Netlify

### 1. Déploiement automatique (recommandé)

1. Connectez votre repository GitHub à Netlify
2. Configurez les paramètres de build :
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/todo-app/build`
   - **Base directory**: `frontend/todo-app`

3. Le fichier `netlify.toml` configurera automatiquement :
   - Redirections SPA
   - Headers de sécurité
   - Cache des assets

### 2. Déploiement manuel

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Naviguer vers le projet
cd frontend/todo-app

# Build
npm run build

# Déployer
netlify deploy --prod --dir=build
```

## ▲ Déploiement sur Vercel

### 1. Déploiement automatique

1. Connectez votre repository à Vercel
2. Configurez les paramètres :
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend/todo-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2. Déploiement avec CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Naviguer vers le projet
cd frontend/todo-app

# Déployer
vercel --prod
```

## 🚂 Déploiement sur Railway

### 1. Avec Railway CLI

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Naviguer vers le projet
cd frontend/todo-app

# Initialiser et déployer
railway init
railway up
```

### 2. Avec interface web

1. Connectez votre repository à Railway
2. Sélectionnez le dossier `frontend/todo-app`
3. Railway détectera automatiquement React
4. Le fichier `railway.toml` optimisera le déploiement

## 🐋 Déploiement avec Docker Hub

### 1. Build et push

```bash
# Se connecter à Docker Hub
docker login

# Build avec tag
docker build -t votre-username/todo-app:latest frontend/todo-app/

# Push vers Docker Hub
docker push votre-username/todo-app:latest
```

### 2. Déploiement sur serveur

```bash
# Sur votre serveur
docker pull votre-username/todo-app:latest
docker run -d -p 80:80 --name todo-app votre-username/todo-app:latest
```

## 🔄 CI/CD avec GitHub Actions

Le pipeline CI/CD est configuré dans `.github/workflows/deploy.yml` et s'exécute automatiquement :

### 1. Configuration des secrets

Dans GitHub Settings > Secrets, ajoutez :

```
# Pour Docker Hub
DOCKER_USERNAME=votre-username
DOCKER_PASSWORD=votre-token

# Pour Netlify
NETLIFY_AUTH_TOKEN=votre-token
NETLIFY_SITE_ID=votre-site-id

# Pour Railway
RAILWAY_TOKEN=votre-token
```

### 2. Déclenchement

Le pipeline se déclenche automatiquement sur :
- Push sur `main` ou `develop`
- Pull requests vers `main`
- Modifications dans `frontend/todo-app/`

## 🌍 Variables d'environnement

### Développement (`.env.development`)

```env
NODE_ENV=development
REACT_APP_NAME=Todo App (Dev)
REACT_APP_VERSION=1.0.0-dev
GENERATE_SOURCEMAP=true
```

### Production (`.env.production`)

```env
NODE_ENV=production
REACT_APP_NAME=Todo App
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false
```

### Configuration par plateforme

| Plateforme | Configuration |
|------------|---------------|
| Netlify    | Automatique via `netlify.toml` |
| Vercel     | Automatique via `vercel.json` |
| Railway    | Automatique via `railway.toml` |
| Docker     | Via `docker-compose.yml` |

## 🛠 Dépannage

### Problèmes courants

#### Build échoue
```bash
# Nettoyer le cache
npm ci
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
- Pour Netlify : `netlify.toml` est configuré
- Pour Vercel : `vercel.json` est configuré

#### Variables d'environnement
```bash
# Vérifier les variables
printenv | grep REACT_APP

# Redémarrer après modification
npm start
```

### Tests de déploiement

```bash
# Test du build local
npm run build
npx serve -s build

# Test Docker
docker-compose up
curl http://localhost:3000

# Test production
npm run build
npm install -g serve
serve -s build -l 3000
```

## 🎯 Optimisations

### Performance

- ✅ Build multi-stage Docker
- ✅ Compression gzip
- ✅ Cache des assets (1 an)
- ✅ Headers de sécurité
- ✅ Minification CSS/JS

### Sécurité

- ✅ CSP headers
- ✅ XSS protection
- ✅ HTTPS redirect
- ✅ Secure cookies
- ✅ No sensitive data in build

### Monitoring

- ✅ Health checks
- ✅ Error tracking
- ✅ Performance metrics
- ✅ Build notifications

## 📞 Support

Pour toute question sur le déploiement :

1. Vérifiez les logs de la plateforme
2. Consultez la documentation officielle
3. Vérifiez les issues GitHub du projet

---

**🎉 Félicitations ! Votre Todo App est maintenant déployée !**