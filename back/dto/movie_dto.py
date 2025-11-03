from pydantic import BaseModel
from typing import Optional, List
from .genre_dto import GenreRead

class MovieCreate(BaseModel):
    title: str
    thumbnail: Optional[str]
    duration_second: Optional[int]
    rating: Optional[float]
    year: Optional[int]
    views: Optional[int]
    director: Optional[str]
    description: Optional[str]

class MovieRead(BaseModel):
    id: int
    title: str
    thumbnail: Optional[str]
    duration_second: Optional[int]
    rating: Optional[float]
    year: Optional[int]
    views: Optional[int]
    director: Optional[str]
    description: Optional[str]
    genres: List[GenreRead]

    class Config:
        orm_mode = True

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    thumbnail: Optional[str] = None
    duration_second: Optional[int] = None
    rating: Optional[float] = None
    year: Optional[int] = None
    views: Optional[int] = None
    director: Optional[str] = None
    description: Optional[str] = None