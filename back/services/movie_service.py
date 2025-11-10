import datetime
from typing import List
import os
from sqlalchemy.orm import Session
from db.models.models import Movie
from db.schemas.movie_schema import MovieRead
from db.models.models import WatchHistory, favorite_movie_association  # Importer ici pour éviter les dépendances circulaires
from datetime import datetime

# HLS_DIRECTORY = "/path/to/hls/files"  # Remplacez par le chemin réel où sont stockés vos fichiers HLS
HLS_DIRECTORY = os.path.join(os.getcwd(), "hls")

def get_all_movies(db: Session) -> List[MovieRead]:
    movies = db.query(Movie).all()
    return [MovieRead.from_orm(movie) for movie in movies]

def get_hls_playlist(db: Session, movie_id: int) -> str:
    """
    Récupère le chemin du fichier HLS (.m3u8) pour un film donné.
    """
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    print(movie.title)
    print("test")
    playlist_path = os.path.join('hls', f"{movie_id}/output.m3u8")
    if os.path.exists(playlist_path):
        return playlist_path
    return ""

def get_hls_segment(movie_id: int, segment: str):
    """
    Sert un segment HLS (.ts) pour un film donné.
    """
    segment_path = os.path.join('hls', f"{movie_id}/{segment}")
    if os.path.exists(segment_path):
        return segment_path
    return ""

def get_movies_genre(db: Session, genre: int) -> List[Movie]:
    """
    Récupère les films par genre.
    """
    print("Genre ID:", genre)
    movies = db.query(Movie).filter(Movie.id_genre == genre).all()
    return movies


def get_position_service(db: Session, user_id: int, movie_id: int) -> int:
    history = db.query(WatchHistory).filter(
        WatchHistory.user_id == user_id,
        WatchHistory.movie_id == movie_id
    ).first()
    if history:
        return history.position_seconds
    return 0

def update_position_service(db: Session, user_id: int, movie_id: int, position: int) -> None:
    history = db.query(WatchHistory).filter(
        WatchHistory.user_id == user_id,
        WatchHistory.movie_id == movie_id
    ).first()
    if history:
        history.position_seconds = position
    else:
        history = WatchHistory(
            user_id=user_id,
            movie_id=movie_id,
            watched_at=datetime.utcnow(),
            position_seconds=position
        )
        db.add(history)
    db.commit()

def get_movies_in_favorite_service(db: Session, user_id: int) -> List[Movie]:
    """
    Récupère les films en favoris de l'utilisateur connecté.
    """
    
    # On regarde si l'utilisateur a des favoris
    query = db.query(Movie).join(
        favorite_movie_association,
        Movie.id == favorite_movie_association.c.movie_id
    ).filter(
        favorite_movie_association.c.user_id == user_id
    )
    favorite_movies = query.all()
    
    
    return favorite_movies