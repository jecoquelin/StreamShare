from typing import List, Optional
from db.schemas.genre_schema import GenreBase
from services.favorite_service import get_favorite_movie_ids
from sqlalchemy.orm import Session
from db.models.models import Movie
from db.schemas.movie_schema import MovieRead

def get_all_movies(db: Session, user_id: Optional[int] = None) -> List[MovieRead]:
    """
    Récupère tous les films de la base de données.
    """
    movies = db.query(Movie).all()
    favorite_ids = get_favorite_movie_ids(db, user_id) if user_id else set()
    
    print(f"favorite_ids : {favorite_ids}")
    
    return [
        MovieRead(
            id=movie.id,
            title=movie.title,
            thumbnail=movie.thumbnail,
            duration_second=movie.duration_second,
            rating=movie.rating,
            year=movie.year,
            views=movie.views,
            director=movie.director,
            description=movie.description,
            isFavorite=movie.id in favorite_ids,
            genres=[GenreBase.from_orm(genre) for genre in movie.genres]  # ← Ajouter genres
        )
        for movie in movies
    ]

def get_movie_by_id(db: Session, movie_id: int) -> Optional[Movie]:
    """
    Récupère un film par son ID.
    """
    return db.query(Movie).filter(Movie.id == movie_id).first()

def get_movies_by_genre(db: Session, genre_id: int) -> List[Movie]:
    """
    Récupère les films par genre.
    """
    print(f"Récupération des films pour le genre ID: {genre_id}")
    movies = db.query(Movie).filter(Movie.id_genre == genre_id).all()
    return movies

def search_movies(db: Session, query: str) -> List[Movie]:
    """
    Recherche des films par titre ou description.
    """
    search_pattern = f"%{query}%"
    movies = db.query(Movie).filter(
        (Movie.title.ilike(search_pattern)) | 
        (Movie.description.ilike(search_pattern))
    ).all()
    return movies

def get_popular_movies(db: Session, limit: int = 10) -> List[Movie]:
    """
    Récupère les films les plus populaires (par nombre de vues).
    """
    movies = db.query(Movie).order_by(Movie.views.desc()).limit(limit).all()
    return movies

def get_recent_movies(db: Session, limit: int = 10) -> List[Movie]:
    """
    Récupère les films les plus récents.
    """
    movies = db.query(Movie).order_by(Movie.year.desc()).limit(limit).all()
    return movies

def increment_movie_views(db: Session, movie_id: int) -> None:
    """
    Incrémente le nombre de vues d'un film.
    """
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie:
        movie.views = (movie.views or 0) + 1
        db.commit()