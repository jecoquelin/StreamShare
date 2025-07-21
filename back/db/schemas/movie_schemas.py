from typing import Optional

from pydantic import BaseModel

class MovieBase(BaseModel):
    title: str
    release_year: int
    director: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = None

class MovieCreate(MovieBase):
    title: str
    release_year: int
    
class MovieUpdate(MovieBase):
    title: Optional[str] = None
    release_year: Optional[int] = None
    director: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = None
    
class MovieResponse(MovieBase):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True
