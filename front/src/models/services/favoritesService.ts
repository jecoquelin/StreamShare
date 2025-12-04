import { api } from "@/lib/api/client";
import { apiRoutes } from "@/lib/api/endoints";

export async function getAllFavorites() {
    try {
        const response = await api(apiRoutes.movies.favorite.list);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
    }
}

export async function addFavorite(movieId: number) {
    try {
        const response = await api(apiRoutes.movies.favorite.add, {movie_id : movieId});
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
    }
}

export async function removeFavorite(movieId: number) {
    try {
        const response = await api(apiRoutes.movies.favorite.remove, {movie_id : movieId});
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
    }
}