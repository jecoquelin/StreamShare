from typing import List
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from db.models.models import Movie, MovieActivity

def get_watch_history(db: Session, user_id: int) -> List[Movie]:
    """
    Récupère l'historique de visionnage de l'utilisateur via MovieActivity.
    Trié par date de dernière lecture (du plus récent au plus ancien).
    """
    query = db.query(Movie).join(
        MovieActivity,
        Movie.id == MovieActivity.movie_id
    ).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.is_watched == True
    ).order_by(MovieActivity.last_watched_at.desc())
    
    watched_movies = query.all()
    return watched_movies

def get_movie_position(db: Session, user_id: int, movie_id: int) -> int:
    """
    Récupère la position de lecture d'un film pour un utilisateur via MovieActivity.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id
    ).first()
    
    if activity and activity.position_seconds:
        return activity.position_seconds
    return 0

def update_movie_position(db: Session, user_id: int, movie_id: int, position: int) -> None:
    """
    Met à jour la position de lecture et marque le film comme visionné via MovieActivity.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id
    ).first()
    
    if activity:
        activity.position_seconds = position
        activity.is_watched = True
        activity.last_watched_at = datetime.now(timezone.utc)
    else:
        activity = MovieActivity(
            user_id=user_id,
            movie_id=movie_id,
            is_favorite=False,
            is_watched=True,
            position_seconds=position,
            last_watched_at=datetime.now(timezone.utc)
        )
        db.add(activity)
    db.commit()

def mark_movie_as_watched(db: Session, user_id: int, movie_id: int) -> None:
    """
    Marque un film comme visionné sans mettre à jour la position.
    """
    activity = db.query(MovieActivity).filter(
        MovieActivity.user_id == user_id,
        MovieActivity.movie_id == movie_id
    ).first()
    
    if activity:
        activity.is_watched = True
        activity.last_watched_at = datetime.now(timezone.utc)
    else:
        activity = MovieActivity(
            user_id=user_id,
            movie_id=movie_id,
            is_favorite=False,
            is_watched=True,
            last_watched_at=datetime.now(timezone.utc)
        )
        db.add(activity)
    db.commit()
