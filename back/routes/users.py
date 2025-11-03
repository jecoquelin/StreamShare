from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from db.models.models import User
from dto.user_dto import UserCreate, UserRead, UserUpdate

router = APIRouter()

@router.get("/users", response_model=List[UserRead])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.post("/users", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user)
    
    if not new_user:
        raise HTTPException(status_code=400, detail="User could not be created")
    
    return new_user

@router.put("/users/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    
    existing_user = update_user(db, user_id, user)
    
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.dict(exclude_unset=True).items():
        setattr(existing_user, key, value)
    db.commit()
    db.refresh(existing_user)
    return existing_user