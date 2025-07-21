import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://user:password@db:5432/dev_db")
    APP_NAME = os.getenv("APP_NAME", "FastAPI Application")

settings = Settings()
