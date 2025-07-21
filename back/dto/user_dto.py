from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel) :
    email: EmailStr
    password: str
    
class UserRead(BaseModel):
    id: int
    email: EmailStr
    role: str = "user"  # Default role is 'user'

    class Config:
        orm_mode = True  # Allows Pydantic to read data from ORM models

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    password: str | None = None