from typing import List
from sqlalchemy.orm import Session
from db.models.models import Movie, Collections, collection_item_association

def get_user_collections(db: Session, user_id: int) -> List[Collections]:
    """
    Récupère toutes les collections d'un utilisateur.
    """
    collections = db.query(Collections).filter(Collections.user_id == user_id).all()
    return collections

def get_collection_by_id(db: Session, collection_id: int) -> Collections:
    """
    Récupère une collection par son ID.
    """
    return db.query(Collections).filter(Collections.id == collection_id).first()

def create_collection(db: Session, user_id: int, name: str) -> Collections:
    """
    Crée une nouvelle collection pour un utilisateur.
    """
    collection = Collections(
        user_id=user_id,
        name=name
    )
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection

def update_collection(db: Session, collection_id: int, name: str) -> Collections:
    """
    Met à jour le nom d'une collection.
    """
    collection = db.query(Collections).filter(Collections.id == collection_id).first()
    if collection:
        collection.name = name
        db.commit()
        db.refresh(collection)
    return collection

def delete_collection(db: Session, collection_id: int) -> None:
    """
    Supprime une collection et toutes ses associations.
    """
    # Supprimer d'abord les associations avec les films
    stmt = collection_item_association.delete().where(
        collection_item_association.c.collection_id == collection_id
    )
    db.execute(stmt)
    
    # Supprimer la collection
    collection = db.query(Collections).filter(Collections.id == collection_id).first()
    if collection:
        db.delete(collection)
        db.commit()

def get_movies_in_collection(db: Session, collection_id: int) -> List[Movie]:
    """
    Récupère tous les films d'une collection.
    """
    movies = db.query(Movie).join(
        collection_item_association,
        Movie.id == collection_item_association.c.movie_id
    ).filter(
        collection_item_association.c.collection_id == collection_id
    ).all()
    return movies

def add_movie_to_collection(db: Session, collection_id: int, movie_id: int) -> None:
    """
    Ajoute un film à une collection.
    """
    # Vérifier si le film n'est pas déjà dans la collection
    existing = db.query(collection_item_association).filter(
        collection_item_association.c.collection_id == collection_id,
        collection_item_association.c.movie_id == movie_id
    ).first()
    
    if not existing:
        stmt = collection_item_association.insert().values(
            collection_id=collection_id,
            movie_id=movie_id
        )
        db.execute(stmt)
        db.commit()

def remove_movie_from_collection(db: Session, collection_id: int, movie_id: int) -> None:
    """
    Retire un film d'une collection.
    """
    stmt = collection_item_association.delete().where(
        collection_item_association.c.collection_id == collection_id,
        collection_item_association.c.movie_id == movie_id
    )
    db.execute(stmt)
    db.commit()

def is_movie_in_collection(db: Session, collection_id: int, movie_id: int) -> bool:
    """
    Vérifie si un film est dans une collection.
    """
    existing = db.query(collection_item_association).filter(
        collection_item_association.c.collection_id == collection_id,
        collection_item_association.c.movie_id == movie_id
    ).first()
    
    return existing is not None
