from pydantic import BaseModel
from typing import Optional

class MovieActivityBase(BaseModel):
    user_id: int
    movie_id: int
    is_favorite: Optional[bool] = None
    is_watched: Optional[bool] = None
    position_seconds: Optional[int] = None
    last_watched_at: Optional[int] = None
    
    class Config:
        orm_mode = True
