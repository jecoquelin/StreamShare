from pydantic import BaseModel

class MovieGenreBase(BaseModel):
    movie_id: int
    genre_id: int

    class Config:
        orm_mode = True