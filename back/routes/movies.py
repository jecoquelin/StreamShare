from typing import List
from db.schemas.user_schema import UserBase
from fastapi import APIRouter, HTTPException, Depends, Response,status
from fastapi.responses import FileResponse, JSONResponse
from db import Movie
from sqlalchemy.orm import Session
from db.schemas.movie_schema import MovieRead
from services.movie_service import get_all_movies, get_hls_playlist, get_hls_segment, get_movies_genre, get_position_service, update_position_service, get_movies_in_favorite_service
from db.session import get_db
from services.auth_service import get_current_user
router = APIRouter()


from pydantic import BaseModel

class PositionUpdate(BaseModel):
    position: int
    
    
@router.get("/movies", response_model=List[MovieRead])
def list_movies(db: Session = Depends(get_db)):
    return get_all_movies(db)

@router.get("/movies/genre/{id_genre}")
def get_movies_by_genre(id_genre: int, db: Session = Depends(get_db)):
    """
    Récupère les films par genre.
    """
    print(f"Genre ID reçu dans la route : {id_genre} (type : {type(id_genre)})")
    movies = get_movies_genre(db, id_genre)
    if not movies:
        raise HTTPException(status_code=404, detail="Aucun film trouvé pour ce genre")
    return [MovieRead.from_orm(movie) for movie in movies]

@router.get("/movies/favorites/{id_user}")
def get_movies_in_favorite(db: Session = Depends(get_db), id_user: int = None):
    """
    Récupère les films en favoris de l'utilisateur connecté.
    """
    if id_user is None:
        raise HTTPException(status_code=400, detail="User ID is required")
    moviesInFavourite = get_movies_in_favorite_service(db, id_user)
    if not moviesInFavourite:
        raise HTTPException(status_code=404, detail="Vous n'avez pas de films en favoris.")
    return [MovieRead.from_orm(movie) for movie in moviesInFavourite]
    pass

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
    position = get_position_service(db, current_user.id, movie_id)
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
        update_position_service(db, current_user.id, movie_id, data.position)
    except Exception as e:
        # Log l’erreur si nécessaire
        print(f"Erreur lors de la mise à jour de la position: {e}")
        # Renvoie un statut 500 avec détail
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de mettre à jour la position du film"
        )
    # JSON vide pour éviter les erreurs front
    return JSONResponse(status_code=status.HTTP_200_OK, content={})