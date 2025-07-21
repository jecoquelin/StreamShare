
from typing import List
from fastapi import APIRouter
from db import Movie
from sqlalchemy.orm import Session
from db.schemas.movie_schemas import MovieResponse
from services.movie_service import get_all_movies
from fastapi import Depends
from db.session import get_db

router = APIRouter()

@router.get("/movies", response_model=List[MovieResponse])
def list_movies(db: Session = Depends(get_db)):
    return get_all_movies(db)
