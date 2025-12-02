# Architecture des Services - StreamShare

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROUTES (API)                             │
│                      /back/routes/movies.py                      │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Appelle les services appropriés
             │
┌────────────▼────────────────────────────────────────────────────┐
│                          SERVICES LAYER                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ movie_service   │  │  hls_service    │  │ favorite_service│ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ • get_all       │  │ • get_playlist  │  │ • get_favorites │ │
│  │ • get_by_id     │  │ • get_segment   │  │ • add_favorite  │ │
│  │ • get_by_genre  │  │                 │  │ • remove_fav    │ │
│  │ • search        │  │                 │  │ • is_favorite   │ │
│  │ • popular       │  │                 │  │                 │ │
│  │ • recent        │  │                 │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐  │
│  │watch_history_   │  │   collection_service                │  │
│  │    service      │  ├─────────────────────────────────────┤  │
│  ├─────────────────┤  │ Collections:                         │  │
│  │ • get_history   │  │ • get_user_collections              │  │
│  │ • get_position  │  │ • get_by_id                         │  │
│  │ • update_pos    │  │ • create                            │  │
│  │ • mark_watched  │  │ • update                            │  │
│  │                 │  │ • delete                            │  │
│  │                 │  │ Movies in Collections:               │  │
│  │                 │  │ • get_movies                        │  │
│  │                 │  │ • add_movie                         │  │
│  │                 │  │ • remove_movie                      │  │
│  │                 │  │ • is_movie_in                       │  │
│  └─────────────────┘  └─────────────────────────────────────┘  │
│                                                                   │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Accès aux données
             │
┌────────────▼────────────────────────────────────────────────────┐
│                        DATABASE LAYER                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐       │
│  │   Movies    │  │ MovieActivity│  │   Collections    │       │
│  ├─────────────┤  ├──────────────┤  ├──────────────────┤       │
│  │ • id        │  │ • user_id    │  │ • id             │       │
│  │ • title     │  │ • movie_id   │  │ • user_id        │       │
│  │ • thumbnail │  │ • is_favorite│  │ • name           │       │
│  │ • duration  │  │ • is_watched │  └──────────────────┘       │
│  │ • rating    │  │ • position_s │                              │
│  │ • year      │  │ • last_watch │  ┌──────────────────┐       │
│  │ • views     │  └──────────────┘  │collection_items  │       │
│  │ • director  │                     ├──────────────────┤       │
│  │ • desc      │                     │ • collection_id  │       │
│  └─────────────┘                     │ • movie_id       │       │
│                                       └──────────────────┘       │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Flux de Données

### Exemple 1: Ajouter un film aux favoris

```
Client Request → POST /movies/42/favorite
                 │
                 ▼
         routes/movies.py: add_to_favorites()
                 │
                 ▼
         favorite_service.add_movie_to_favorites()
                 │
                 ▼
         Database: INSERT/UPDATE MovieActivity
                 │
                 ▼
         Response: {"message": "Film ajouté aux favoris"}
```

### Exemple 2: Récupérer l'historique de visionnage

```
Client Request → GET /movies/history
                 │
                 ▼
         routes/movies.py: list_watch_history()
                 │
                 ▼
         watch_history_service.get_watch_history()
                 │
                 ▼
         Database: SELECT Movies JOIN MovieActivity
                   WHERE is_watched = True
                   ORDER BY last_watched_at DESC
                 │
                 ▼
         Response: [List of MovieRead]
```

### Exemple 3: Créer une collection et y ajouter des films

```
Client Request → POST /collections {"name": "Action"}
                 │
                 ▼
         routes/movies.py: create_user_collection()
                 │
                 ▼
         collection_service.create_collection()
                 │
                 ▼
         Database: INSERT INTO Collections
                 │
                 ▼
         Response: {"id": 1, "name": "Action", "user_id": 1}

---

Client Request → POST /collections/1/movies {"movie_id": 42}
                 │
                 ▼
         routes/movies.py: add_movie_to_collection()
                 │
                 ▼
         collection_service.add_movie_to_collection()
                 │
                 ▼
         Database: INSERT INTO collection_items
                 │
                 ▼
         Response: {"message": "Film ajouté à la collection"}
```

## Principe de Séparation

### ✅ Routes (movies.py)
- Validation des entrées utilisateur
- Gestion de l'authentification
- Appel des services appropriés
- Formatage des réponses HTTP
- Gestion des erreurs HTTP

### ✅ Services (service layer)
- Logique métier
- Orchestration des opérations
- Validation des règles métier
- Appel à la base de données
- Transformation des données

### ✅ Models (models.py)
- Définition des tables
- Relations entre tables
- Contraintes de base de données

## Avantages

1. **Modularité** : Chaque service est indépendant
2. **Testabilité** : Services faciles à tester unitairement
3. **Maintenance** : Bugs faciles à localiser et corriger
4. **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités
5. **Réutilisabilité** : Services réutilisables dans plusieurs routes
