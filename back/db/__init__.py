from .models.models import Base, User, Movie, Role, Genre
from .session import SessionLocal, engine

def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()