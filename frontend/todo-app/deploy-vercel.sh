#!/bin/bash

# Script de déploiement rapide pour Vercel
# Usage: ./deploy-vercel.sh

set -e

echo "🚀 Déploiement Todo App sur Vercel"
echo "==================================="

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI n'est pas installé"
    log_info "Installation en cours..."
    npm install -g vercel
fi

# Vérifier les dépendances
log_info "Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    log_info "Installation des dépendances..."
    npm install
fi

# Build du projet
log_info "Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    log_success "Build réussi!"
else
    log_error "Échec du build"
    exit 1
fi

# Vérifier la connexion Vercel
log_info "Vérification de la connexion Vercel..."
if ! vercel whoami &> /dev/null; then
    log_warning "Vous devez vous connecter à Vercel"
    log_info "Exécutez : vercel login"
    echo ""
    echo "Puis relancez ce script"
    exit 1
fi

# Déploiement
log_info "Déploiement sur Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    log_success "Déploiement réussi sur Vercel!"
    log_info "Votre application est maintenant en ligne"
else
    log_error "Échec du déploiement"
    exit 1
fi

echo ""
log_success "🎉 Todo App déployée avec succès sur Vercel!"
echo ""
echo "Prochaines étapes :"
echo "1. Vérifiez l'URL fournie par Vercel"
echo "2. Testez toutes les fonctionnalités"
echo "3. Configurez un domaine personnalisé (optionnel)"