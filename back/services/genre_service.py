from typing import List
import os
from sqlalchemy.orm import Session
from db.models.models import Genre
from db.schemas.genre_schema import GenreBase

def get_all_genres(db: Session) -> List[GenreBase]:
    genres = db.query(Genre).all()
    print(genres)
    return [GenreBase.from_orm(genre) for genre in genres]