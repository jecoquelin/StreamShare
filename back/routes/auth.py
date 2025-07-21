from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.schemas.user_schemas import UserCreate
from db.session import get_db
from services.auth_service import login_user, register_user

router = APIRouter()

@router.post("/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    token = login_user(db, form_data.username, form_data.password)
    if not token:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=False,  # à activer en prod (HTTPS uniquement)
        samesite="strict",
        path="/",
        max_age=60 * 60 * 24 * 7  # 7 jours
    )

    return {"message": "Login successful"}

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user is not None : 
        created_user = register_user(db, user)
        return {"message": "User registered successfully", "user_id": created_user.id}
    else:
        raise HTTPException(status_code=400, detail="User data is required")