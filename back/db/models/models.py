from datetime import datetime
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, Table
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# Table d'association pour la relation many-to-many entre Movie et Genre
movie_genre_association = Table(
    'movies_genres',
    Base.metadata,
    Column('movie_id', Integer, ForeignKey('movies.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id'), primary_key=True),
)

class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)

class Role(BaseModel):
    __tablename__ = 'roles'
    name = Column(String(50), unique=True, nullable=False)

class User(BaseModel):
    __tablename__ = 'users'
    email = Column(String(100), unique=True, nullable=False)
    username = Column(String(50), nullable=True)
    password = Column(String(128), nullable=False)
    role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)
    role = relationship('Role', backref='users')

class Genre(BaseModel):
    __tablename__ = 'genres'
    name = Column(String(50), unique=True, nullable=False)

class Movie(BaseModel):
    __tablename__ = 'movies'
    title = Column(String(255), nullable=False)
    thumbnail = Column(String(255), nullable=True)
    duration_second = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    year = Column(Integer, nullable=True)
    views = Column(Integer, default=0)
    director = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    genres = relationship('Genre', secondary=movie_genre_association, backref='movies')

class WatchHistory(Base):
    __tablename__ = 'watch_history'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    watched_at = Column(DateTime, nullable=False)
    position_seconds = Column(Integer, nullable=True)
    user = relationship('User', backref='watch_history')
    movie = relationship('Movie', backref='watch_history')