from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .movie_schema import MovieRead

class CollectionBase(BaseModel):
    name: str

class CollectionCreate(CollectionBase):
    pass

class CollectionRead(CollectionBase):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    movies: List[MovieRead] = []
    
    class Config:
        orm_mode = True
        from_attributes = True