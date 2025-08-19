import logging
from datetime import datetime
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import declarative_base, relationship

from ..session import SessionLocal, engine  # noqa: F401

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    
class User(BaseModel):
    __tablename__ = 'users'

    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    role = Column(String(20), default='user')  # 'user' or 'admin'

class Movie(BaseModel):
    __tablename__ = 'movies'
    
    title = Column(String(255), nullable=False)
    thumbnail = Column(String(255), nullable=True)
    duration = Column(String(10), nullable=True)
    id_genre = Column(Integer, ForeignKey('genres.id'), nullable=True)
    rating = Column(Float, nullable=True)
    year = Column(Integer, nullable=True)
    views = Column(Integer, default=0)
    director = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    
class Genre(BaseModel):
    __tablename__ = 'genres'
    
    name = Column(String(50), unique=True, nullable=False)