from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.session import get_db
from services.collection_service import (
    get_user_collections,
    get_collection_by_id,
    create_collection,
    delete_collection,
    add_movie_to_collection,
    remove_movie_from_collection
)
from services.auth_service import get_current_user
from db.models.models import User
from db.schemas.collection_shema import CollectionRead

router = APIRouter()

@router.get("/collections", response_model=List[CollectionRead])
def get_collections(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère toutes les collections de l'utilisateur connecté"""
    collections = get_user_collections(db, current_user.id)
    return collections

@router.get("/collections/{collection_id}")
def get_collection(
    collection_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère une collection spécifique avec ses films"""
    collection = get_collection_by_id(db, collection_id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    if collection.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    return collection

@router.post("/collections")
def create_new_collection(
    name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Crée une nouvelle collection"""
    collection = create_collection(db, current_user.id, name)
    return collection

@router.delete("/collections/{collection_id}")
def delete_collection_route(
    collection_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Supprime une collection"""
    collection = get_collection_by_id(db, collection_id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    if collection.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    delete_collection(db, collection_id)
    return {"message": "Collection supprimée"}

@router.post("/collections/{collection_id}/movies/{movie_id}")
def add_movie(
    collection_id: int,
    movie_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Ajoute un film à une collection"""
    collection = get_collection_by_id(db, collection_id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    if collection.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    add_movie_to_collection(db, collection_id, movie_id)
    return {"message": "Film ajouté à la collection"}

@router.delete("/collections/{collection_id}/movies/{movie_id}")
def remove_movie(
    collection_id: int,
    movie_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retire un film d'une collection"""
    collection = get_collection_by_id(db, collection_id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection non trouvée")
    
    if collection.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    remove_movie_from_collection(db, collection_id, movie_id)
    return {"message": "Film retiré de la collection"}
