from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel) :
    email: EmailStr
    username: str
    password: str
    role_id: int
    
class UserRead(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: str

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None