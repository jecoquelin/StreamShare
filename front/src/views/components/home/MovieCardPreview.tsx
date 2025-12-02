"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { apiRoutes } from "@/lib/api/endoints";

interface MovieCardPreviewProps {
  movie_id: number;
  isHovered: boolean;
}

export default function MovieCardPreview({ movie_id, isHovered }: MovieCardPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Attendre 1 seconde avant de charger la vidéo (comme Netflix)
    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        const manifest =
          "http://localhost:8001" +
          apiRoutes.movies.hlsPlaylist.path.replace("{movie_id}", movie_id.toString());

        if (Hls.isSupported()) {
          const hls = new Hls({
            xhrSetup: (xhr) => {
              xhr.withCredentials = true;
            },
            startLevel: 0, // Commencer avec la qualité la plus basse pour un chargement rapide
            maxBufferLength: 5, // Buffer court pour la preview
          });

          hlsRef.current = hls;
          hls.loadSource(manifest);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.muted = true; // Toujours muté pour l'autoplay
            video.setAttribute('muted', ''); // Force muted attribute
            video.setAttribute('playsinline', ''); // Force playsinline
            
            // Attendre que la vidéo soit prête
            video.addEventListener('canplay', () => {
              video.currentTime = 10; // Commencer à 10 secondes pour avoir un aperçu intéressant
              
              // Essayer de lire avec un délai
              setTimeout(() => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.then(() => {
                    setIsLoaded(true);
                  }).catch((err) => {
                    // Si l'autoplay échoue, on garde quand même l'image
                    console.log("Autoplay bloqué (normal):", err.message);
                    setIsLoaded(true); // Afficher quand même le poster
                  });
                }
              }, 100);
            }, { once: true });
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS Error:", data);
          });

        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = manifest;
          video.muted = true;
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          
          video.addEventListener("canplay", () => {
            video.currentTime = 10;
            
            setTimeout(() => {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.then(() => {
                  setIsLoaded(true);
                }).catch((err) => {
                  console.log("Autoplay bloqué (normal):", err.message);
                  setIsLoaded(true);
                });
              }
            }, 100);
          }, { once: true });
        }
      }, 1000); // Délai de 1 seconde avant de charger
    } else {
      // Quand le hover se termine, nettoyer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      
      video.pause();
      video.src = "";
      setIsLoaded(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [isHovered, movie_id]);

  return (
    <div className={`absolute inset-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        className="w-full h-full object-cover"
        onMouseEnter={(e) => {
          // Tenter de relancer si en pause au hover
          const video = e.currentTarget;
          if (video.paused && isHovered) {
            video.play().catch(() => {});
          }
        }}
      />
      {/* Gradient overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
