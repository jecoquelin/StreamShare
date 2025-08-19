import json
import os
import random
import sys
from db.models.models import User
from db.models.models import Movie
from db.models.models import Genre
from db.session import SessionLocal

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_PATH = os.path.join(BASE_DIR, "scripts_db", "users.json")
MOVIES_PATH = os.path.join(BASE_DIR, "scripts_db", "movies.json")
GENRES_PATH = os.path.join(BASE_DIR, "scripts_db", "genres.json")


def init_db():
    db = SessionLocal()
    try:
        add_users(db)
        add_genres(db)
        add_movies(db)
        db.commit()
        print("✅ DB seeded successfully.")  # noqa: T201
    except Exception as e:
        db.rollback()
        print(f"❌ Seeding failed: {e}")  # noqa: T201
        sys.exit(1)
    finally:
        db.close()


def add_users(db):
    if not os.path.exists(USERS_PATH):
        raise FileNotFoundError(f"User file not found: {USERS_PATH}")

    with open(USERS_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for user in data:
        if db.query(User).filter_by(email=user["email"]).first():
            continue

        new_user = User(
            email=user["email"],
            password=user["password"],
            role=user["role"] if "role" in user else "user"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print(f"User {new_user.email} added.")
        
def add_movies(db):
    if not os.path.exists(MOVIES_PATH):
        raise FileNotFoundError(f"Movie file not found: {MOVIES_PATH}")

    with open(MOVIES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for movie in data:
        
        if db.query(Movie).filter_by(title=movie["title"]).first():
            continue
    
        new_movie = Movie(
            title=movie["title"],
            thumbnail=movie["thumbnail"],
            duration=movie["duration"],
            id_genre=movie["id_genre"],
            rating=movie["rating"],
            year=movie["year"],
            views=movie["views"],
            director=movie["director"],
            description=movie["description"],
        )
        db.add(new_movie)
        db.commit()
        db.refresh(new_movie)
        print(f"Movie {new_movie.title} added.")
        
def add_genres(db):
    if not os.path.exists(GENRES_PATH):
        raise FileNotFoundError(f"Genre file not found: {GENRES_PATH}")

    with open(GENRES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for genre in data:
        
        if db.query(Genre).filter_by(name=genre["name"]).first():
            continue
    
        new_genre = Genre(
            name=genre["name"],
        )
        db.add(new_genre)
        db.commit()
        db.refresh(new_genre)
        print(f"Genre {new_genre.name} added.")

if __name__ == "__main__":
    init_db()