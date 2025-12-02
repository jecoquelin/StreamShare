# Services Architecture

Cette structure organise les services de l'application StreamShare de manière modulaire et facile à maintenir.

## Structure des Services

### 📁 `movie_service.py`
Gestion des opérations de base sur les films.

**Fonctions:**
- `get_all_movies()` - Récupère tous les films
- `get_movie_by_id()` - Récupère un film par ID
- `get_movies_by_genre()` - Filtre les films par genre
- `search_movies()` - Recherche de films par titre/description
- `get_popular_movies()` - Films les plus vus
- `get_recent_movies()` - Films les plus récents
- `increment_movie_views()` - Incrémente le compteur de vues

### 📁 `hls_service.py`
Gestion du streaming HLS (HTTP Live Streaming).

**Fonctions:**
- `get_hls_playlist()` - Récupère le fichier .m3u8 d'un film
- `get_hls_segment()` - Récupère un segment .ts spécifique

### 📁 `favorite_service.py`
Gestion des films favoris des utilisateurs.

**Fonctions:**
- `get_favorite_movies()` - Liste des favoris d'un utilisateur
- `add_movie_to_favorites()` - Ajoute un film aux favoris
- `remove_movie_from_favorites()` - Retire un film des favoris
- `is_movie_favorite()` - Vérifie si un film est favori

**Table utilisée:** `MovieActivity` (champ `is_favorite`)

### 📁 `watch_history_service.py`
Gestion de l'historique de visionnage et des positions de lecture.

**Fonctions:**
- `get_watch_history()` - Historique de visionnage (trié par date)
- `get_movie_position()` - Position de lecture d'un film
- `update_movie_position()` - Met à jour la position et marque comme visionné
- `mark_movie_as_watched()` - Marque un film comme visionné sans position

**Table utilisée:** `MovieActivity` (champs `is_watched`, `position_seconds`, `last_watched_at`)

### 📁 `collection_service.py`
Gestion des collections de films personnalisées par utilisateur.

**Fonctions:**

**Collections:**
- `get_user_collections()` - Liste des collections d'un utilisateur
- `get_collection_by_id()` - Récupère une collection par ID
- `create_collection()` - Crée une nouvelle collection
- `update_collection()` - Met à jour le nom d'une collection
- `delete_collection()` - Supprime une collection

**Films dans collections:**
- `get_movies_in_collection()` - Films d'une collection
- `add_movie_to_collection()` - Ajoute un film à une collection
- `remove_movie_from_collection()` - Retire un film d'une collection
- `is_movie_in_collection()` - Vérifie si un film est dans une collection

**Tables utilisées:** `Collections`, `collection_item_association`

### 📁 `auth_service.py`
Authentification et autorisation (existant).

### 📁 `user_service.py`
Gestion des utilisateurs (existant).

### 📁 `genre_service.py`
Gestion des genres (existant).

## Table MovieActivity

La table `MovieActivity` centralise toutes les interactions utilisateur-film :

```python
{
    user_id: int,
    movie_id: int,
    is_favorite: bool,           # Film en favori
    is_watched: bool,             # Film visionné
    position_seconds: int,        # Position de lecture (en secondes)
    last_watched_at: datetime     # Dernière date de visionnage
}
```

## Avantages de cette Architecture

✅ **Séparation des responsabilités** - Chaque service a un rôle clair
✅ **Facilité de maintenance** - Bugs faciles à localiser
✅ **Testabilité** - Services indépendants faciles à tester
✅ **Réutilisabilité** - Fonctions réutilisables dans plusieurs routes
✅ **Lisibilité** - Code organisé et documenté

## Exemple d'Utilisation

```python
from services.favorite_service import add_movie_to_favorites
from services.watch_history_service import update_movie_position
from services.collection_service import create_collection

# Ajouter aux favoris
add_movie_to_favorites(db, user_id=1, movie_id=42)

# Mettre à jour la position
update_movie_position(db, user_id=1, movie_id=42, position=1250)

# Créer une collection
collection = create_collection(db, user_id=1, name="Mes films préférés")
```
