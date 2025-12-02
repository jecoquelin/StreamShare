from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from services.watch_history_service import get_watch_history
from services.auth_service import get_current_user

from db.models.models import User

router = APIRouter()

@router.get("/watch-history")
def get_user_watch_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère l'historique de visionnage de l'utilisateur connecté"""
    history = get_watch_history(db, current_user.id)
    return history
