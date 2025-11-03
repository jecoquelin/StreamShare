from pydantic import BaseModel
from typing import Optional
from .role_schema import RoleBase

class UserBase(BaseModel):
    id: int
    username: str
    email: str
    role: RoleBase

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role_id: int

class UserResponse(UserBase):
    pass