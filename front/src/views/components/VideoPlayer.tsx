"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Hls, { ErrorData } from "hls.js";
import { api } from "@/lib/api/client";
import { apiRoutes } from "@/lib/api/endoints";
import { useAuth } from '@/models/store/AuthStore';

interface VideoPlayerProps {
    movie_id: number;
}

export default function VideoPlayer({ movie_id }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [position, setPosition] = useState<number>(0);

    // Extraire un identifiant stable de l'utilisateur
    const userId = user?.id; // ou user?.email, selon votre structure

    console.log("Rendering VideoPlayer for movie_id:", movie_id, "userId:", userId);

    //
    // 1) Récupérer la dernière position
    //
    useEffect(() => {
        //if (!userId) return;

        const load = async () => {
            try {
                const res = await api<{ position: number }>(
                    apiRoutes.movies.watchedPosition.get,
                    { movie_id }
                );
                setPosition(res?.position ?? 0);
            } catch (err) {
                console.error("Erreur récupération position:", err);
            }
        };
        load();
    }, [movie_id, userId]); // ← Dépendances stables (primitives)

    //
    // 2) Charger la vidéo + reprendre position
    //
    useEffect(() => {
        // if (!videoRef.current || !userId) return;
        if (!videoRef.current) return;

        const video = videoRef.current;
        let hls: Hls | null = null;

        const manifest =
            "http://localhost:8001" +
            apiRoutes.movies.hlsPlaylist.path.replace("{movie_id}", movie_id.toString());

        const startVideo = () => {
            if (position > 0) video.currentTime = position;
            video.play().catch(() => { });
        };

        if (Hls.isSupported()) {
            hls = new Hls({
                xhrSetup: (xhr) => {
                    xhr.withCredentials = true;
                },
            });
            hls.loadSource(manifest);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, startVideo);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = manifest;
            video.addEventListener("loadedmetadata", startVideo);
        } else {
            setError("HLS non supporté (Android < 10 par ex.).");
        }

        return () => {
            hls?.destroy();
        };
    }, [position, movie_id, userId]); // ← Dépendances stables

    //
    // 3) Fonction de sauvegarde stable avec useCallback
    //
    const savePosition = useCallback(async () => {
        // if (!videoRef.current || !userId) return;
        if (!videoRef.current ) return;
        try {
            await api(
                apiRoutes.movies.watchedPosition.update,
                { movie_id },
                { body: { position: videoRef.current.currentTime } }
            );
        } catch (err) {
            console.error("Erreur sauvegarde position:", err);
        }
    }, [movie_id, userId]); // ← Recréée uniquement si movie_id ou userId change

    //
    // 4) Sauvegarde auto toutes les 30 sec
    //
    useEffect(() => {
        // if (!userId) return;
        const interval = setInterval(savePosition, 30000);
        return () => clearInterval(interval);
    }, [savePosition, userId]); // ← savePosition est stable grâce à useCallback

    //
    // 5) Sauvegarder en quittant/onglet caché
    //
    useEffect(() => {
        // if (!userId) return;

        const handleVisibility = () => {
            if (document.hidden) savePosition();
        };
        const handleBeforeUnload = () => savePosition();

        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [savePosition, userId]); // ← Dépendances stables

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <video
                ref={videoRef}
                controls
                playsInline
                style={{ width: "100%", height: "100%", background: "black" }}
            />
            {error && (
                <div style={{ color: "red", marginTop: 10 }}>
                    {error}
                </div>
            )}
        </div>
    );
}