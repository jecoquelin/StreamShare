from typing import Optional

from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    password: str

class UserCreate(UserBase):
    email: str
    password: str
    
class UserUpdate(UserBase):
    email: Optional[str] = None
    password: Optional[str] = None
    
class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
