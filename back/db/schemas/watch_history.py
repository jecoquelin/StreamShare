from pydantic import BaseModel
from datetime import datetime
from .user_schema import UserBase
from .movie_schema import MovieBase

class WatchHistoryBase(BaseModel):
    user_id: int
    movie_id: int
    watched_at: datetime
    position_seconds: Optional[int]

    class Config:
        orm_mode = True

class WatchHistoryResponse(WatchHistoryBase):
    user: UserBase
    movie: MovieBase