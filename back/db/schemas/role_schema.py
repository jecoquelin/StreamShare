from pydantic import BaseModel

class RoleBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True