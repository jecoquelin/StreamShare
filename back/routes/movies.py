from typing import List
from db.schemas.user_schema import UserBase
from fastapi import APIRouter, HTTPException, Depends, Response, status
from fastapi.responses import FileResponse, JSONResponse
from db import Movie
from db.models.models import Collections
from sqlalchemy.orm import Session
from db.schemas.movie_schema import MovieRead

# Import des services spécialisés
from services.movie_service import get_all_movies, get_movies_by_genre
from services.hls_service import get_hls_playlist, get_hls_segment
from services.watch_history_service import (
    get_watch_history, 
    get_movie_position, 
    update_movie_position
)
from services.favorite_service import (
    get_favorite_movies,
    add_movie_to_favorites,
    remove_movie_from_favorites
)
from services.collection_service import (
    get_user_collections,
    create_collection,
    get_movies_in_collection,
    add_movie_to_collection,
    remove_movie_from_collection,
    delete_collection
)

from db.session import get_db
from services.auth_service import get_current_user
router = APIRouter()


from pydantic import BaseModel

class PositionUpdate(BaseModel):
    position: int

class CollectionCreate(BaseModel):
    name: str

class MovieToCollection(BaseModel):
    movie_id: int
    
    
@router.get("/movies", response_model=List[MovieRead])
def list_movies(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """
    Récupère tous les films.
    """
    user_id = current_user.id if current_user else None
    return get_all_movies(db, user_id)

@router.get("/movies/genre/{id_genre}")
def list_movies_by_genre(id_genre: int, db: Session = Depends(get_db)):
    """
    Récupère les films par genre.
    """
    print(f"Genre ID reçu dans la route : {id_genre} (type : {type(id_genre)})")
    movies = get_movies_by_genre(db, id_genre)
    if not movies:
        raise HTTPException(status_code=404, detail="Aucun film trouvé pour ce genre")
    return [MovieRead.from_orm(movie) for movie in movies]

@router.get("/movies/favorites")
def get_movies_in_favorite(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    """
    Récupère les films en favoris de l'utilisateur connecté.
    """
    print(f"Utilisateur courant ID : {current_user.id}")
    movies_in_favourite = get_favorite_movies(db, current_user.id)
    if not movies_in_favourite:
        raise HTTPException(status_code=404, detail="Vous n'avez pas de films en favoris.")
    return [MovieRead.from_orm(movie) for movie in movies_in_favourite]

@router.get("/movies/{movie_id}/hls/playlist")
def get_movie_hls(movie_id: int, db: Session = Depends(get_db)):
    """
    Sert le fichier HLS (.m3u8) pour un film donné.
    """
    print("coucou")
    playlist_path = get_hls_playlist(db, movie_id)
    if not playlist_path:
        raise HTTPException(status_code=404, detail="HLS playlist not found")
    return FileResponse(playlist_path, media_type="application/vnd.apple.mpegurl")

@router.get("/movies/{movie_id}/hls/{segment}")
def get_movie_segment(movie_id: int, segment: str):
    """
    Sert un segment HLS (.ts) pour un film donné.
    """
    segment_path = get_hls_segment(movie_id, segment)
    if not segment_path:
        raise HTTPException(status_code=404, detail="Segment not found")
    return FileResponse(segment_path, media_type="video/mp2t")

@router.get("/movie/{movie_id}/position")
def get_position(movie_id: int, current_user: UserBase = Depends(get_current_user), db: Session = Depends(get_db)):
    position = get_movie_position(db, current_user.id, movie_id)
    if not position:
        position = 0
    return {"position": position}

@router.put("/movie/{movie_id}/position")
def update_position(
    movie_id: int, 
    data: PositionUpdate,
    current_user: UserBase = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    try:
        update_movie_position(db, current_user.id, movie_id, data.position)
    except Exception as e:
        # Log l'erreur si nécessaire
        print(f"Erreur lors de la mise à jour de la position: {e}")
        # Renvoie un statut 500 avec détail
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de mettre à jour la position du film"
        )
    # JSON vide pour éviter les erreurs front
    return JSONResponse(status_code=status.HTTP_200_OK, content={})

# === Routes pour la gestion des favoris ===

# @router.post("/movies/{movie_id}/favorite", status_code=status.HTTP_201_CREATED)
# def add_to_favorites(
#     movie_id: int,
#     current_user: UserBase = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """
#     Ajoute un film aux favoris de l'utilisateur.
#     """
#     try:
#         add_movie_to_favorites(db, current_user.id, movie_id)
#         return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "Film ajouté aux favoris"})
#     except Exception as e:
#         print(f"Erreur lors de l'ajout aux favoris: {e}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Impossible d'ajouter le film aux favoris"
#         )

# @router.delete("/movies/{movie_id}/favorite", status_code=status.HTTP_200_OK)
# def remove_from_favorites(
#     movie_id: int,
#     current_user: UserBase = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     """
#     Retire un film des favoris de l'utilisateur.
#     """
#     try:
#         remove_movie_from_favorites(db, current_user.id, movie_id)
#         return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Film retiré des favoris"})
#     except Exception as e:
#         print(f"Erreur lors du retrait des favoris: {e}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Impossible de retirer le film des favoris"
#         )

# === Routes pour l'historique de visionnage ===

@router.get("/movies/history", response_model=List[MovieRead])
def list_watch_history(
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Récupère l'historique de visionnage de l'utilisateur connecté.
    """
    watched_movies = get_watch_history(db, current_user.id)
    return [MovieRead.from_orm(movie) for movie in watched_movies]

# === Routes pour la gestion des collections ===

@router.get("/collections")
def list_user_collections(
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Récupère toutes les collections de l'utilisateur.
    """
    collections = get_user_collections(db, current_user.id)
    return [{"id": c.id, "name": c.name, "user_id": c.user_id} for c in collections]

@router.post("/collections", status_code=status.HTTP_201_CREATED)
def create_user_collection(
    collection_data: CollectionCreate,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Crée une nouvelle collection pour l'utilisateur.
    """
    try:
        collection = create_collection(db, current_user.id, collection_data.name)
        return {"id": collection.id, "name": collection.name, "user_id": collection.user_id}
    except Exception as e:
        print(f"Erreur lors de la création de la collection: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de créer la collection"
        )

@router.get("/collections/{collection_id}/movies", response_model=List[MovieRead])
def get_movies_in_collection(
    collection_id: int,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Récupère tous les films d'une collection.
    """
    # Vérifier que la collection appartient à l'utilisateur
    collection = db.query(Collections).filter(
        Collections.id == collection_id,
        Collections.user_id == current_user.id
    ).first()
    
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    movies = get_movies_in_collection(db, collection_id)
    return [MovieRead.from_orm(movie) for movie in movies]

@router.post("/collections/{collection_id}/movies", status_code=status.HTTP_201_CREATED)
def add_movie_to_collection(
    collection_id: int,
    movie_data: MovieToCollection,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Ajoute un film à une collection.
    """
    # Vérifier que la collection appartient à l'utilisateur
    collection = db.query(Collections).filter(
        Collections.id == collection_id,
        Collections.user_id == current_user.id
    ).first()
    
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    try:
        add_movie_to_collection(db, collection_id, movie_data.movie_id)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "Film ajouté à la collection"})
    except Exception as e:
        print(f"Erreur lors de l'ajout du film à la collection: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible d'ajouter le film à la collection"
        )

@router.delete("/collections/{collection_id}/movies/{movie_id}", status_code=status.HTTP_200_OK)
def remove_movie_from_collection(
    collection_id: int,
    movie_id: int,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retire un film d'une collection.
    """
    # Vérifier que la collection appartient à l'utilisateur
    collection = db.query(Collections).filter(
        Collections.id == collection_id,
        Collections.user_id == current_user.id
    ).first()
    
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    try:
        remove_movie_from_collection(db, collection_id, movie_id)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Film retiré de la collection"})
    except Exception as e:
        print(f"Erreur lors du retrait du film de la collection: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de retirer le film de la collection"
        )

@router.delete("/collections/{collection_id}", status_code=status.HTTP_200_OK)
def delete_collection(
    collection_id: int,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Supprime une collection et toutes ses associations.
    """
    # Vérifier que la collection appartient à l'utilisateur
    collection = db.query(Collections).filter(
        Collections.id == collection_id,
        Collections.user_id == current_user.id
    ).first()
    
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    try:
        delete_collection(db, collection_id)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Collection supprimée"})
    except Exception as e:
        print(f"Erreur lors de la suppression de la collection: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de supprimer la collection"
        )