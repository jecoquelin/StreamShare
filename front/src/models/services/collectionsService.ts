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
        const response = await api(`/api/collections/${collectionId}`);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération de la collection:', error);
        throw error;
    }
}

export async function createCollection(name: string) {
    try {
        const response = await api('/api/collections', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de la création de la collection:', error);
        throw error;
    }
}

export async function deleteCollection(collectionId: number) {
    try {
        const response = await api(`/api/collections/${collectionId}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de la suppression de la collection:', error);
        throw error;
    }
}

export async function getMovieInCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(`/api/collection/`, {
            method: 'POST',
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la collection:', error);
        throw error;
    }
}

export async function addMovieToCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(`/api/collections/${collectionId}/movies/${movieId}`, {
            method: 'POST',
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la collection:', error);
        throw error;
    }
}

export async function removeMovieFromCollection(collectionId: number, movieId: number) {
    try {
        const response = await api(`/api/collections/${collectionId}/movies/${movieId}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error('Erreur lors du retrait du film de la collection:', error);
        throw error;
    }
}
