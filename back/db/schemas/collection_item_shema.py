from pydantic import BaseModel

class CollectionItemBase(BaseModel):
    collection: int
    user_id: str
    name: str
    
    class Config:
        orm_mode = True