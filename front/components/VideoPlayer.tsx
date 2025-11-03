"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { apiRoutes } from "../network/apiRoutes";
import { api } from "../network/apiClient";
import { useAuth } from "../contexts/AuthContext";

interface VideoPlayerProps {
  movie_id: number;
}

interface PositionResponse {
  position: number;
}

export default function VideoPlayer({ movie_id }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<number>(0);

  // Récupérer la dernière position depuis le backend
  useEffect(() => {
    if (!user) return;

    const fetchPosition = async () => {
      try {
        const res = await api<PositionResponse>(
          apiRoutes.movies.watchedPosition.get,
          { movie_id }
        );
        setPosition(res?.position ?? 0);
      } catch (err) {
        console.error("Erreur récupération position:", err);
      }
    };

    fetchPosition();
  }, [movie_id, user]);

  // Initialiser HLS et reprendre la vidéo à la bonne position
  useEffect(() => {
    if (!videoRef.current || typeof window === "undefined") return;
    if (!user) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    const manifestUrl =
      "http://localhost:8001" +
      apiRoutes.movies.hlsPlaylist.path.replace("{movie_id}", movie_id.toString());

    if (Hls.isSupported()) {
      hls = new Hls({
        debug: false,
        xhrSetup: (xhr) => {
          xhr.withCredentials = true;
        },
      });

      hls.loadSource(manifestUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (position > 0) video.currentTime = position;
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError(`Erreur fatale: ${data.details}`);
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls?.startLoad();
        }
      });
    } else {
      setError("HLS non supporté par ce navigateur.");
    }

    return () => {
      hls?.destroy();
    };
  }, [position, movie_id, user]);

  // Fonction pour sauvegarder la position
  const savePosition = async () => {
    if (!videoRef.current || !user) return;
    const currentTime = videoRef.current.currentTime ?? 0;
    try {
      await api(
        apiRoutes.movies.watchedPosition.update,
        { movie_id },
        { body: { position: currentTime } }
      );
    } catch (err) {
      console.error("Erreur sauvegarde position:", err);
    }
  };

  // Sauvegarde automatique toutes les 10 secondes
  useEffect(() => {
    if (!videoRef.current || !user) return;

    const interval = setInterval(savePosition, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [movie_id, user]);

  // Sauvegarde quand l’utilisateur quitte la page ou change d’onglet
  useEffect(() => {
    if (!user) return;

    const handleVisibilityChange = () => {
      if (document.hidden) savePosition();
    };

    const handleBeforeUnload = () => {
      savePosition();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [movie_id, user]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video ref={videoRef} controls style={{ width: "100%", height: "100%" }} />
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </div>
  );
}
