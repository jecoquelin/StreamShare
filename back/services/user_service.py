from typing import List
import os
from sqlalchemy.orm import Session
from db.models.models import User
from db.schemas.movie_schema import UserRead, UserCreate, UserUpdate

def get_all_users(db: Session) -> List[UserRead]:
    users = db.query(User).all()
    return [UserRead.from_orm(user) for user in users]

def create_user(db: Session, user: UserCreate) -> UserRead:
    new_user = User(
        email=user.email,
        username=user.username,
        password=user.password,
        role_id=user.role_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserRead.from_orm(new_user)

def update_user(db: Session, user_id: int, user: UserUpdate) -> UserRead:
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise Exception("User not found")
    for key, value in user.dict(exclude_unset=True).items():
        setattr(existing_user, key, value)
    db.commit()
    db.refresh(existing_user)
    return UserRead.from_orm(existing_user)