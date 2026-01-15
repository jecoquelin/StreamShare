import { api } from "@/lib/api/client";
import { apiRoutes } from "@/lib/api/endoints";

export async function getUserCollections() {
    try {
        console.log('Fetching user collections from /api/collections');
        const response = await api(apiRoutes.collections.list);
        console.log('Received collections response:', response);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des collections:', error);
        throw error;
    }
}

export async function getCollectionById(collectionId: number) {
    try {
        const response = await api(apiRoutes.collections.get, { collection_id: collectionId });
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération de la collection:', error);
        throw error;
    }
}

export async function createCollection(name: string) {
    try {
        const response = await api(apiRoutes.collections.create, { name });
        return response;
    } catch (error) {
        console.error('Erreur lors de la création de la collection:', error);
        throw error;
    }
}

export async function deleteCollection(collectionId: number) {
    try {
        const response = await api(apiRoutes.collections.delete, { collection_id: collectionId });
        return response;
    } catch (error) {
        console.error('Erreur lors de la suppression de la collection:', error);
        throw error;
    }
}

export async function getMovieInCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(apiRoutes.collections.getMovie, { collection_id: collectionId, movie_id: movieId });
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la collection:', error);
        throw error;
    }
}

export async function addMovieToCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(apiRoutes.collections.addMovie, { collection_id: collectionId, movie_id: movieId });
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la collection:', error);
        throw error;
    }
}

export async function removeMovieFromCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(apiRoutes.collections.removeMovie, { collection_id: collectionId, movie_id: movieId });
        return response;
    } catch (error) {
        console.error('Erreur lors du retrait du film de la collection:', error);
        throw error;
    }
}
