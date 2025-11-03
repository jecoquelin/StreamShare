import json
import os
import sys
from datetime import datetime
from db.models.models import Role, User, Movie, Genre, WatchHistory, movie_genre_association
from db.session import SessionLocal

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROLES_PATH = os.path.join(BASE_DIR, "scripts_db", "roles.json")
USERS_PATH = os.path.join(BASE_DIR, "scripts_db", "users.json")
MOVIES_PATH = os.path.join(BASE_DIR, "scripts_db", "movies.json")
GENRES_PATH = os.path.join(BASE_DIR, "scripts_db", "genres.json")
MOVIES_GENRES_PATH = os.path.join(BASE_DIR, "scripts_db", "movies_genres.json")
WATCH_HISTORY_PATH = os.path.join(BASE_DIR, "scripts_db", "watch_history.json")


def init_db():
    db = SessionLocal()
    try:
        add_roles(db)
        add_users(db)
        add_movies(db)
        add_genres(db)
        add_movies_genres(db)
        add_watch_history(db)
        db.commit()
        print("✅ DB seeded successfully.")  # noqa: T201
    except Exception as e:
        db.rollback()
        print(f"❌ Seeding failed: {e}")  # noqa: T201
        sys.exit(1)
    finally:
        db.close()

def add_roles(db):
    if not os.path.exists(ROLES_PATH):
        raise FileNotFoundError(f"Role file not found: {ROLES_PATH}")

    with open(ROLES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for role in data:
        if db.query(Role).filter_by(name=role["name"]).first():
            continue

        new_role = Role(
            id=role["id"],
            name=role["name"]
        )
        db.add(new_role)
        db.commit()
        db.refresh(new_role)
        print(f"Role {new_role.name} added.")

def add_users(db):
    if not os.path.exists(USERS_PATH):
        raise FileNotFoundError(f"User file not found: {USERS_PATH}")

    with open(USERS_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for user in data:
        if db.query(User).filter_by(email=user["email"]).first():
            continue

        new_user = User(
            id=user["id"],
            username=user["username"],
            email=user["email"],
            password=user["password"],
            role_id=user["role"]
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print(f"User {new_user.email} added.")

def add_genres(db):
    if not os.path.exists(GENRES_PATH):
        raise FileNotFoundError(f"Genre file not found: {GENRES_PATH}")

    with open(GENRES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for genre in data:
        if db.query(Genre).filter_by(name=genre["name"]).first():
            continue

        new_genre = Genre(
            name=genre["name"]
        )
        db.add(new_genre)
        db.commit()
        db.refresh(new_genre)
        print(f"Genre {new_genre.name} added.")
        
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
            thumbnail=movie.get("thumbnail"),
            duration_second=movie.get("duration_second"),
            rating=movie.get("rating"),
            year=movie.get("year"),
            views=movie.get("views"),
            director=movie.get("director"),
            description=movie.get("description"),
        )
        db.add(new_movie)
        db.commit()
        db.refresh(new_movie)
        print(f"Movie {new_movie.title} added.")
        
def add_movies_genres(db):
    if not os.path.exists(MOVIES_GENRES_PATH):
        raise FileNotFoundError(f"Movies-Genres file not found: {MOVIES_GENRES_PATH}")

    with open(MOVIES_GENRES_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for relation in data:
        movie_id = relation["movie_id"]
        genre_id = relation["genre_id"]

        # Vérifiez si la relation existe déjà
        existing_relation = db.execute(
            movie_genre_association.select().where(
                movie_genre_association.c.movie_id == movie_id,
                movie_genre_association.c.genre_id == genre_id
            )
        ).fetchone()

        if existing_relation:
            continue

        db.execute(movie_genre_association.insert().values(
            movie_id=movie_id,
            genre_id=genre_id
        ))
        db.commit()
        print(f"Relation Movie ID {movie_id} - Genre ID {genre_id} added.")


def add_watch_history(db):
    if not os.path.exists(WATCH_HISTORY_PATH):
        raise FileNotFoundError(f"Watch History file not found: {WATCH_HISTORY_PATH}")

    with open(WATCH_HISTORY_PATH, encoding="utf-8") as file:
        data = json.load(file)

    for history in data:
        if db.query(WatchHistory).filter_by(
            user_id=history["user_id"],
            movie_id=history["movie_id"]
        ).first():
            continue

        new_history = WatchHistory(
            user_id=history["user_id"],
            movie_id=history["movie_id"],
            watched_at=datetime.fromtimestamp(history["watched_at"]),
            position_seconds=history.get("position_seconds")
        )
        db.add(new_history)
        db.commit()
        db.refresh(new_history)
        print(f"Watch history for User ID {new_history.user_id} and Movie ID {new_history.movie_id} added.")

if __name__ == "__main__":
    init_db()