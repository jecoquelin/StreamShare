from typing import Optional

from pydantic import BaseModel

class MovieBase(BaseModel):
    title: str
    thumbnail: Optional[str] = None
    duration: Optional[str] = None
    id_genre: Optional[int] = None
    rating: Optional[float] = None
    year: Optional[int] = None
    views: Optional[int] = 0
    director: Optional[str] = None
    description: Optional[str] = None

class MovieCreate(MovieBase):
    title: str
    year: int
    
class MovieUpdate(MovieBase):
    title: Optional[str] = None
    year: Optional[int] = None
    director: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = None
    
class MovieResponse(MovieBase):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True
