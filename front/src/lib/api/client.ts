function formatEndpoint(template: string, params?: Record<string, string | number>) {
    console.log("Template:", template);
    console.log("Params:", params);
    return template.replace(/\{(\w+)\}/g, (_, key) => {
        const value = params?.[key];
        if (!value) throw new Error(`Paramètre manquant : ${key}`);
        return String(value);
    });
}

interface ApiOptions {
    body?: any;
    headers?: HeadersInit;
    queryParams?: Record<string, string | number>; // pour ?limit=10
}

interface RouteDefinition {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
}

export async function api<T = any>(
    route: RouteDefinition,
    pathParams?: Record<string, string | number>,
    options: ApiOptions = {}
): Promise<T> {
    const { body, headers, queryParams } = options;

    const url = new URL(formatEndpoint(route.path, pathParams), "http://localhost:8001");
    console.log("Constructed URL:", url.toString());
    if (queryParams) {
        Object.entries(queryParams).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }

    const response = await fetch(url.toString(), {
        method: route.method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include', // pour envoyer les cookies
        ...(body && { body: JSON.stringify(body) }),
    });


    if (!response.ok) {
        const text = await response.text(); // Obtenir le texte brut
        let errorData;
        try {
            errorData = JSON.parse(text);
        } catch {
            errorData = { detail: text }; // si ce n’est pas du JSON
        }

        // Tu lances une erreur enrichie
        throw {
            status: response.status,
            message: errorData.detail || 'Une erreur est survenue',
        };
    }

    // Vérification du type de contenu avant d'analyser
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json() as T;
    } else if (contentType && contentType.includes('application/vnd.apple.mpegurl')) {
        // Traiter comme du texte (ou une autre manipulation si nécessaire)
        return await response.text() as unknown as T; // ou une autre logique pour gérer la playlist
    }

    // Ajoute un retour par défaut si aucun des cas précédents n'est atteint
    throw new Error('Type de contenu non géré : ' + contentType);
}
