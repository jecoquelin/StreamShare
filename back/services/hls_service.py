import os
from sqlalchemy.orm import Session
from db.models.models import Movie

HLS_DIRECTORY = os.path.join(os.getcwd(), "hls")

def get_hls_playlist(db: Session, movie_id: int) -> str:
    """
    Récupère le chemin du fichier HLS (.m3u8) pour un film donné.
    """
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        return ""
    
    playlist_path = os.path.join('hls', f"{movie_id}/output.m3u8")
    if os.path.exists(playlist_path):
        return playlist_path
    return ""

def get_hls_segment(movie_id: int, segment: str) -> str:
    """
    Sert un segment HLS (.ts) pour un film donné.
    """
    segment_path = os.path.join('hls', f"{movie_id}/{segment}")
    if os.path.exists(segment_path):
        return segment_path
    return ""
