from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from db.models.models import Role
from dto.role_dto import RoleCreate, RoleRead

router = APIRouter()

@router.get("/roles", response_model=List[RoleRead])
def list_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@router.post("/roles", response_model=RoleRead)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    new_role = Role(name=role.name)
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role