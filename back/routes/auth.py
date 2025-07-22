from db.schemas.auth_schema import LoginRequest
from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.schemas.user_schemas import UserBase, UserCreate
from db.session import get_db
from services.auth_service import login_user, register_user, get_current_user

router = APIRouter()

@router.post("/login")
def login(response: Response, payload: LoginRequest, db: Session = Depends(get_db)):
    print(payload)  # Debugging line
    token = login_user(db, payload.email, payload.password)
    if not token:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    response = JSONResponse({"message": "Login successful"})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=True,
        samesite="strict",
        path="/",
        max_age=60 * 60 * 24 * 7
    )
    return response

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user is not None : 
        created_user = register_user(db, user)
        return {"message": "User registered successfully", "user_id": created_user.id}
    else:
        raise HTTPException(status_code=400, detail="User data is required")
    
@router.get("/me")
def get_me(current_user: UserBase = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email
    }