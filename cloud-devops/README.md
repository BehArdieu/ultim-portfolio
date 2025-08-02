# ☁️ Cloud & DevOps

Ce dossier contient mes configurations et projets DevOps démontrant mes compétences en :

## Technologies utilisées
- **Docker** - Conteneurisation des applications
- **GitLab CI/CD** - Pipeline d'intégration continue
- **AWS** - Services cloud Amazon
- **Railway** - Plateforme de déploiement moderne
- **Render** - Hébergement d'applications web

## Outils DevOps
- **Docker Compose** - Orchestration multi-conteneurs
- **Nginx** - Serveur web et reverse proxy
- **PostgreSQL/MongoDB** - Bases de données conteneurisées
- **SonarQube** - Analyse de qualité de code

## Projets

### À venir
- Configuration Docker multi-services (frontend + backend + BDD)
- Pipeline CI/CD complet avec tests et déploiement
- Infrastructure as Code avec Terraform
- Monitoring avec Prometheus et Grafana
- Configuration Kubernetes pour microservices

## Bonnes pratiques démontrées
- 🐳 Conteneurisation optimisée (multi-stage builds)
- 🔄 CI/CD automatisé avec tests
- 🔒 Sécurité DevSecOps
- 📊 Monitoring et logging
- 🚀 Déploiements blue-green/rolling
- 📝 Infrastructure as Code
- 🔧 Configuration management

## Structure typique

```
projet/
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── .gitlab-ci.yml
├── terraform/
│   ├── main.tf
│   └── variables.tf
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── monitoring/
    ├── prometheus.yml
    └── grafana-dashboard.json
```

## Comment utiliser

### Docker
```bash
# Construire et lancer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### Déploiement
```bash
# AWS CLI
aws configure
terraform init
terraform plan
terraform apply

# Railway
railway login
railway deploy
```