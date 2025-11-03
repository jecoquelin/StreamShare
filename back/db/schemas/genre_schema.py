from pydantic import BaseModel

class GenreBase(BaseModel):
    id: int
    name: str
    
    class Config:
        orm_mode = True