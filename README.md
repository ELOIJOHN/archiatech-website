# Dashboard ArchiaTech

Dashboard de gestion pour l'écosystème ArchiaTech.

## Fonctionnalités

- 📊 Statistiques en temps réel
- 👥 Gestion des utilisateurs
- 🤖 Suivi des agents
- 📝 Visualisation des logs
- 🌓 Mode sombre/clair
- 📥 Export CSV
- 🔍 Recherche et filtrage
- 📈 Graphiques interactifs

## Technologies

- **Frontend**: React 18 + TypeScript
- **UI**: Tailwind CSS
- **Graphiques**: Recharts
- **Icons**: Lucide React
- **Database**: Supabase
- **Build**: Vite
- **Deployment**: Docker + Traefik

## Déploiement

### Prérequis

- Docker & Docker Compose
- Traefik configuré
- Supabase configuré

### Installation

1. Cloner le repository
2. Copier `.env.example` vers `.env` et configurer les variables
3. Build et démarrer:

```bash
docker-compose up -d --build
```

Le dashboard sera accessible à: https://dashboard.archiatech.com

## Configuration

Variables d'environnement dans `.env`:

```
VITE_SUPABASE_URL=https://api.archiatech.com
VITE_SUPABASE_ANON_KEY=your_key_here
```

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

© 2025 ArchiaTech. All rights reserved.
