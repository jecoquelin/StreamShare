from db.schemas.user_schema import UserBase
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from services.favorite_service import (
    get_favorite_movies,
    add_movie_to_favorites,
    remove_movie_from_favorites
)

from db.session import get_db
from services.auth_service import get_current_user
router = APIRouter()



@router.post("/favorites/addmovies/{movie_id}", status_code=status.HTTP_201_CREATED)
def add_to_favorites(
    movie_id: int,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Ajoute un film aux favoris de l'utilisateur.
    """
    try:
        add_movie_to_favorites(db, current_user.id, movie_id)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "Film ajouté aux favoris"})
    except Exception as e:
        print(f"Erreur lors de l'ajout aux favoris: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible d'ajouter le film aux favoris"
        )

@router.post("/favorites/removemovies/{movie_id}", status_code=status.HTTP_200_OK)
def remove_from_favorites(
    movie_id: int,
    current_user: UserBase = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retire un film des favoris de l'utilisateur.
    """
    try:
        remove_movie_from_favorites(db, current_user.id, movie_id)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Film retiré des favoris"})
    except Exception as e:
        print(f"Erreur lors du retrait des favoris: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Impossible de retirer le film des favoris"
        )