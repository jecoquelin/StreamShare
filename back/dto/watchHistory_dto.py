from pydantic import BaseModel
from datetime import datetime
from .user_dto import UserRead
from .movie_dto import MovieRead

class WatchHistoryCreate(BaseModel):
    user_id: int
    movie_id: int
    watched_at: datetime
    position_seconds: Optional[int]

class WatchHistoryRead(BaseModel):
    user: UserRead
    movie: MovieRead
    watched_at: datetime
    position_seconds: Optional[int]

    class Config:
        orm_mode = True