from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from db.models.models import Genre
from dto.genre_dto import GenreCreate, GenreRead
from services.genre_service import get_all_genres

router = APIRouter()

@router.get("/genres", response_model=List[GenreRead])
def list_movies(db: Session = Depends(get_db)):
    return get_all_genres(db)

@router.post("/genres", response_model=GenreRead)
def create_genre(genre: GenreCreate, db: Session = Depends(get_db)):
    new_genre = Genre(name=genre.name)
    db.add(new_genre)
    db.commit()
    db.refresh(new_genre)
    return new_genre