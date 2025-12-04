from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import movies, auth, genres, collections, watch_history, favorites

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["*"] pour tout autoriser (déconseillé en prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

# Inclure la route
app.include_router(movies.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(genres.router)
app.include_router(collections.router, prefix="/api", tags=["collections"])
app.include_router(favorites.router, prefix="/api", tags=["favorites"])
app.include_router(watch_history.router, prefix="/api", tags=["watch-history"])

