import React from 'react';


interface GenreProps {
    id: number;
    name: string;
}
interface GenreFilterProps {
    genres: GenreProps[];
    onGenreSelect: (genre: GenreProps) => void;
}

export default function GenreFilter( {genres, onGenreSelect} : GenreFilterProps) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label htmlFor="genre-select" style={{ marginRight: '10px' }}>Filtrer par genre :</label>
            <select
                id="genre-select"
                onChange={(e) => {
                    const selectedGenre = genres.find(g => g.name === e.target.value);
                    if (selectedGenre) {
                        onGenreSelect(selectedGenre);
                    }
                }}
            >
                <option value="">Tous les genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};