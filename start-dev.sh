#!/bin/bash

# Lancer la base de données PostgreSQL
echo "Démarrage de PostgreSQL..."
cd apps/backend/docker && docker-compose up -d

# Attendre que PostgreSQL soit prêt
echo "Attente que PostgreSQL soit prêt..."
sleep 5

# Lancer le backend
echo "Démarrage des apps..."
cd ../../ && pnpm run dev:all
BACKEND_PID=$!

# Fonction pour arrêter tous les processus lors de la terminaison du script
cleanup() {
  echo "Arrêt des processus..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  cd ../../apps/backend/docker && docker-compose down
  echo "Tous les processus arrêtés"
  exit 0
}

# Détecter la fermeture du script
trap cleanup SIGINT SIGTERM

# Maintenir le script en exécution
echo "SyndicCheck est en cours d'exécution. Appuyez sur Ctrl+C pour arrêter."
wait
