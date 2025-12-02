import { api } from "@/lib/api/client";
import { apiRoutes } from "@/lib/api/endoints";

export async function getWatchHistory() {
    try {
        const response = await api(apiRoutes.watchHistory.list);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        throw error;
    }
}
