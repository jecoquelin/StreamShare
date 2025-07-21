export const apiRoutes = {
    auth: {
        login: { method: 'POST', path: '/login' },
        register: { method: 'POST', path: '/register' },
        logout: { method: 'POST', path: '/auth/logout' },
    },
    users: {
        get: { method: 'GET', path: '/user/{id}' },
        list: { method: 'GET', path: '/users' },
        create: { method: 'POST', path: '/user' },
        update: { method: 'PUT', path: '/user/{id}' },
        delete: { method: 'DELETE', path: '/user/{id}' },
    },
    movies: {
        get: { method: 'GET', path: '/movie/{id}' },
        list: { method: 'GET', path: '/movies' },
        create: { method: 'POST', path: '/movie' },
        update: { method: 'PUT', path: '/movie/{id}' },
        delete: { method: 'DELETE', path: '/movie/{id}' },
    },
} as const;
