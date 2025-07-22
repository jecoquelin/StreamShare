from fastapi import HTTPException, Request, Depends
from sqlalchemy.orm import Session
from jose import JWTError
from db.session import get_db
from db.schemas.user_schemas import UserCreate
from mapper.user_mapper import user_create_to_model
from db.models.models import User
from core.security import decode_access_token, get_password_hash, verify_password, create_access_token

required_fields = ["email", "password"]

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

def login_user(db: Session, email: str, password: str):
    print(f"Attempting to login user: {email}")  # Debugging line
    user = db.query(User).filter(User.email == email).first()
    print(user)  # Debugging line
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

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Token manquant")

    try:
        payload = decode_access_token(token)
        print(f"Decoded payload: {payload}")  # Debugging line
        user_email: int = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Token invalide")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalide")

    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return user
