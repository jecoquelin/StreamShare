from pydantic import BaseModel

class MovieGenreCreate(BaseModel):
    movie_id: int
    genre_id: int

class MovieGenreRead(BaseModel):
    movie_id: int
    genre_id: int

    class Config:
        orm_mode = True