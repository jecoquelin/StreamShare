import React from "react";
import MovieCard from "@/views/components/home/MovieCard";
import { Movie } from "@/models/types/movie";

interface MovieRowProps {
  title: string;
  videos: Movie[];
  icon: React.ReactNode;
}

export default function MovieRow({ title, videos, icon }: MovieRowProps) {
  return (
    <div className="mb-12 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-white">{icon}</div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {videos.slice(0, 6).map((video) => (
          <MovieCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
