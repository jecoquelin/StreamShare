function formatEndpoint(template: string, params?: Record<string, string | number>) {
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
        const error = await response.text();
        throw new Error(`API error (${response.status}): ${error}`);
    }

    return await response.json();
}
