from pydantic import BaseModel
from typing import Optional, List
from .genre_schema import GenreBase

class MovieBase(BaseModel):
    id: int
    title: str
    thumbnail: Optional[str] = None
    duration_second: Optional[int] = None
    rating: Optional[float] = None
    year: Optional[int] = None
    views: Optional[int] = 0
    director: Optional[str] = None
    description: Optional[str] = None
    
    class Config:
        orm_mode = True

class MovieCreate(MovieBase):
    title: str
    year: int
    
class MovieUpdate(MovieBase):
    title: str
    thumbnail: Optional[str]
    duration_second: Optional[int]
    rating: Optional[float]
    year: Optional[int]
    views: Optional[int]
    director: Optional[str]
    description: Optional[str]
    
class MovieRead(MovieBase):
    genres: List[GenreBase]
