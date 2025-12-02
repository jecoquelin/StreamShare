"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "@/views/components/VideoPlayer";

interface PageProps {
  params: Promise<{ id: string }>; // Changez ici pour indiquer que params est une promesse
}

export default function WatchPage({ params }: PageProps) {
  const [movieId, setMovieId] = useState<number | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params; // Résoudre les params
        const id = Number(resolvedParams.id);
      
        if (!isNaN(id)) {
          setMovieId(id); // Mettre à jour l'état avec l'ID valide
        } else {
          setMovieId(null); // ID invalide
        }
      } catch (error) {
        console.error("Erreur lors de la résolution des params:", error);
        setMovieId(null); // Gérer l'erreur si nécessaire
      }
    };

    fetchParams(); // Appeler la fonction pour résoudre les params
  }, [params]);

  if (movieId === null) return <div>ID invalide</div>; // Gérer l'ID invalide

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <VideoPlayer movie_id={movieId} />
    </div>
  );
}
