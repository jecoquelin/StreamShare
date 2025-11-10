import { api } from "./apiClient";
import { apiRoutes } from "./apiRoutes";

export async function fetchGenre() {
    try {
        const genres = await api(apiRoutes.genres.list); // Appel à la route définie dans apiRoutes
        console.log('Liste des genre :', genres);
        return genres;
    } catch (error) {
        console.error('Erreur lors de la récupération des genres :', error);
    }
}

export async function fetchMovieByGenre(id_genre: number) {
    try {
        const moviesByGenre = await api(apiRoutes.movies.genre, {id_genre : id_genre}); // Appel à la route définie dans apiRoutes
        console.log('Liste des movies :', moviesByGenre);
        return moviesByGenre;
    } catch (error) {
        console.error('Erreur lors de la récupération des genres :', error);
    }
}

export async function fetchFavoriteMovies(id_user: number) {
    try {
        const favoriteMovies = await api(apiRoutes.movies.favorite.list, {id_user : id_user}); // Appel à la route définie dans apiRoutes
        console.log('Liste des movies favoris :', favoriteMovies);
        return favoriteMovies;
    } catch (error) {
        console.error('Erreur lors de la récupération des movies favoris :', error);
    }
}