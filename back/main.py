from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import movies
from routes import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ou ["*"] pour tout autoriser (déconseillé en prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

# Inclure la route
app.include_router(movies.router)
app.include_router(auth.router)
