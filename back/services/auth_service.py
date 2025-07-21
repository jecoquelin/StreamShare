from fastapi import HTTPException
from sqlalchemy.orm import Session
from db.schemas.user_schemas import UserCreate
from mapper.user_mapper import user_create_to_model
from db.models.models import User
from core.security import get_password_hash, verify_password, create_access_token

required_fields = ["email", "password"]

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return create_access_token({"sub": user.email})

def register_user(db: Session, user_data: UserCreate):
    
    # Regarde si tout les attributs obligatoire sont présent et pas vide
    missing_attributes = [attr for attr in required_fields if not getattr(user_data, attr)]

    if missing_attributes:
        return {"message": f"Missing required attributes: {', '.join(missing_attributes)}"}

    user = user_create_to_model(user_data)

    # Regarde si l'utilisateur existe déjà
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        # return {"message": "User already exists"}
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Création de l'utilisateur
    user.password = get_password_hash(user.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user