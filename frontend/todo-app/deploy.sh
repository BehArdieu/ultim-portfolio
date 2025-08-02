#!/bin/bash

# Script de déploiement pour Todo App
# Usage: ./deploy.sh [platform]
# Plateformes supportées: netlify, vercel, railway, docker

set -e

echo "🚀 Script de déploiement Todo App"
echo "================================="

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PLATFORM=${1:-"build"}

# Fonction pour afficher les messages
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

# Vérifier les prérequis
check_requirements() {
    log_info "Vérification des prérequis..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé"
        exit 1
    fi
    
    log_success "Prérequis vérifiés"
}

# Installation des dépendances
install_dependencies() {
    log_info "Installation des dépendances..."
    npm ci
    log_success "Dépendances installées"
}

# Build de l'application
build_app() {
    log_info "Build de l'application..."
    npm run build
    log_success "Application buildée dans ./build/"
}

# Déploiement sur Netlify
deploy_netlify() {
    log_info "Déploiement sur Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI non trouvé, installation..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=build
    log_success "Déployé sur Netlify"
}

# Déploiement sur Vercel
deploy_vercel() {
    log_info "Déploiement sur Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI non trouvé, installation..."
        npm install -g vercel
    fi
    
    vercel --prod
    log_success "Déployé sur Vercel"
}

# Déploiement sur Railway
deploy_railway() {
    log_info "Déploiement sur Railway..."
    
    if ! command -v railway &> /dev/null; then
        log_warning "Railway CLI non trouvé, installation..."
        npm install -g @railway/cli
    fi
    
    railway up
    log_success "Déployé sur Railway"
}

# Build Docker
build_docker() {
    log_info "Build de l'image Docker..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    docker build -t todo-app .
    log_success "Image Docker créée: todo-app"
    
    log_info "Pour lancer l'application:"
    echo "docker run -p 3000:80 --name todo-app-container todo-app"
}

# Serveur local pour tester
serve_local() {
    log_info "Démarrage du serveur local..."
    
    if ! command -v serve &> /dev/null; then
        log_warning "serve non trouvé, installation..."
        npm install -g serve
    fi
    
    log_success "Application disponible sur http://localhost:3000"
    serve -s build -l 3000
}

# Menu principal
show_menu() {
    echo ""
    echo "Plateformes de déploiement disponibles:"
    echo "1. build    - Build uniquement"
    echo "2. local    - Serveur local (test)"
    echo "3. netlify  - Netlify"
    echo "4. vercel   - Vercel"
    echo "5. railway  - Railway"
    echo "6. docker   - Image Docker"
    echo ""
}

# Exécution principale
main() {
    check_requirements
    install_dependencies
    build_app
    
    case $PLATFORM in
        "build")
            log_success "Build terminé !"
            log_info "Les fichiers sont dans ./build/"
            ;;
        "local")
            serve_local
            ;;
        "netlify")
            deploy_netlify
            ;;
        "vercel")
            deploy_vercel
            ;;
        "railway")
            deploy_railway
            ;;
        "docker")
            build_docker
            ;;
        *)
            log_error "Plateforme non reconnue: $PLATFORM"
            show_menu
            exit 1
            ;;
    esac
}

# Point d'entrée
if [ $# -eq 0 ]; then
    show_menu
    read -p "Choisissez une plateforme (ou 'build' par défaut): " PLATFORM
    PLATFORM=${PLATFORM:-"build"}
fi

main

log_success "Déploiement terminé ! 🎉"