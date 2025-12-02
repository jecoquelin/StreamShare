from typing import List
from sqlalchemy.orm import Session
from db.models.models import Movie, MovieActivity

def get_favorite_movies(db: Session, user_id: int) -> List[Movie]:
    """
    Récupère les films en favoris de l'utilisateur via MovieActivity.
    """
    query = db.query(Movie).join(
        MovieActivity,
        Movie.id == MovieActivity.movie_id
    ).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.is_favorite == True
    )
    favorite_movies = query.all()
    
    print(f"Films favoris pour l'utilisateur {user_id} : {[movie.title for movie in favorite_movies]}")
    
    return favorite_movies

def add_movie_to_favorites(db: Session, user_id: int, movie_id: int) -> None:
    """
    Ajoute un film aux favoris via MovieActivity.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id
    ).first()
    
    if activity:
        activity.is_favorite = True
    else:
        activity = MovieActivity(
            user_id=user_id,
            movie_id=movie_id,
            is_favorite=True,
            is_watched=False
        )
        db.add(activity)
    db.commit()

def remove_movie_from_favorites(db: Session, user_id: int, movie_id: int) -> None:
    """
    Retire un film des favoris via MovieActivity.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id
    ).first()
    
    if activity:
        activity.is_favorite = False
        db.commit()

def is_movie_favorite(db: Session, user_id: int, movie_id: int) -> bool:
    """
    Vérifie si un film est dans les favoris de l'utilisateur.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id,
        MovieActivity.is_favorite == True
    ).first()
    
    return activity is not None
