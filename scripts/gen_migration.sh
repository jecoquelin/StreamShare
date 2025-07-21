#!/bin/bash
set -e

MESSAGE="${1:-auto migration}"
echo "🛠  Génération de la migration Alembic : « $MESSAGE »..."

NETWORK_NAME="myflix-network"
DB_CONTAINER_NAME="myflix-temp-db"

# 1. Crée le réseau s'il n'existe pas
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "🔧 Création du réseau Docker '$NETWORK_NAME'..."
  docker network create "$NETWORK_NAME"
fi

# 2. Lance le conteneur PostgreSQL si pas déjà lancé
if ! docker ps -a --format '{{.Names}}' | grep -q "^$DB_CONTAINER_NAME$"; then
  echo "🐘 Lancement de la base PostgreSQL temporaire..."
  docker run -d \
    --name "$DB_CONTAINER_NAME" \
    --network "$NETWORK_NAME" \
    -e POSTGRES_USER=dev_user \
    -e POSTGRES_PASSWORD=dev_pass \
    -e POSTGRES_DB=dev_db \
    -v pg_temp_data:/var/lib/postgresql/data \
    postgres:13

  echo "⏳ Attente de la disponibilité de la base..."
  sleep 5  # Petit délai initial

  # Attente active avec retry
  for i in {1..10}; do
    if docker exec "$DB_CONTAINER_NAME" pg_isready -U dev_user > /dev/null 2>&1; then
      echo "✅ Base de données disponible."
      break
    fi
    echo "⌛ En attente de la base... ($i/10)"
    sleep 2
  done
fi

# 3. Lancer la génération de migration Alembic
docker run --rm \
  --network "$NETWORK_NAME" \
  -v $(pwd)/back:/app \
  -w /app \
  -e DATABASE_USER=dev_user \
  -e DATABASE_PASSWORD=dev_pass \
  -e DATABASE_NAME=dev_db \
  -e ALEMBIC_DATABASE_URL=postgresql+psycopg2://dev_user:dev_pass@${DB_CONTAINER_NAME}:5432/dev_db \
  python:3.11-slim bash -c "\
    pip install -r requirements.txt && \
    alembic revision --autogenerate -m \"$MESSAGE\""

echo "✅ Migration générée avec succès."

# 4. Optionnel : arrêter le conteneur temporaire
read -p "🧹 Supprimer le conteneur temporaire de DB ? (y/n) " CLEANUP
if [[ "$CLEANUP" == "y" ]]; then
  docker rm -f "$DB_CONTAINER_NAME"
  docker volume rm pg_temp_data
  echo "🗑  Conteneur et volume supprimés."
fi
