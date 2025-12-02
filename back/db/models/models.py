from datetime import datetime
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, Table, Boolean
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# Table d'association pour la relation many-to-many entre Movie et Genre
movie_genre_association = Table(
    'movies_genres',
    Base.metadata,
    Column('movie_id', Integer, ForeignKey('movies.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id'), primary_key=True),
)

# Table d'association pour la relation many-to-many entre Collection et Movie
collection_item_association = Table(
    'collection_items',
    Base.metadata,
    Column('collection_id', Integer, ForeignKey('collections.id'), primary_key=True),
    Column('movie_id', Integer, ForeignKey('movies.id'), primary_key=True),
)

# Table d'association pour la relation BaseModelmany-to-many entre User et Movie (favoris)
favorite_movie_association = Table(
    'favorites_movies',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('movie_id', Integer, ForeignKey('movies.id'), primary_key=True),
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
    
class MovieActivity(Base):
    __tablename__ = 'movie_activity'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    is_favorite = Column(Boolean, nullable=False, default=False)
    is_watched = Column(Boolean, nullable=False, default=False)
    position_seconds = Column(Integer, nullable=True)
    last_watched_at = Column(DateTime, nullable=True)
    user = relationship('User', backref='movie_activities')
    movie = relationship('Movie', backref='movie_activities')
    
class Collections (BaseModel): 
    __tablename__ = 'collections'
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    movies = relationship('Movie', secondary=collection_item_association, backref='collections')
