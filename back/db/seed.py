import json
import os
import random
import sys
from db.models.models import User
from db.models.models import Movie
from db.session import SessionLocal

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_PATH = os.path.join(BASE_DIR, "scripts_db", "users.json")
MOVIES_PATH = os.path.join(BASE_DIR, "scripts_db", "movies.json")


def init_db():
    db = SessionLocal()
    try:
        add_users(db)
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
        
def add_users(db):
    if not os.path.exists(MOVIES_PATH):
        raise FileNotFoundError(f"User file not found: {MOVIES_PATH}")

    with open(MOVIES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for movie in data:
        
        if db.query(Movie).filter_by(title=movie["title"]).first():
            continue
    
        new_movie = Movie(
            title=movie["title"],
            release_year=movie["release_year"],
            director=movie["director"],
            description=movie["description"],
            genre=movie["genre"],
            rating=movie["rating"],
        )
        db.add(new_movie)
        db.commit()
        db.refresh(new_movie)
        print(f"User {new_movie.title} added.")

if __name__ == "__main__":
    init_db()