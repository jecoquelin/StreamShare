from typing import List
from sqlalchemy.orm import Session
from db.models.models import Movie
from db.schemas.movie_schemas import MovieResponse


def get_all_movies(db: Session) -> List[MovieResponse]:
    movies = db.query(Movie).all()
    print(movies)
    return [MovieResponse.from_orm(movie) for movie in movies]
