import { Genre } from './genre';

export interface Movie {
    id: number;
    title: string;
    thumbnail: string;
    duration_second: number;
    rating: number;
    year: number;
    views: number;
    director: string;
    description: string;
    genres: Genre[];
}