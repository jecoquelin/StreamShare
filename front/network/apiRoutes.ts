export const apiRoutes = {
    auth: {
        login: { method: 'POST', path: '/login' },
        me: { method: 'GET', path: '/me' },
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
        genre: { method: 'GET', path: '/movies/genre/{id_genre}'},
        hlsPlaylist: { method: 'GET', path: '/movies/{movie_id}/hls/playlist' },
        watchedPosition: {
            get: { method: 'GET', path: '/movie/{movie_id}/position' },
            update: { method: 'PUT', path: '/movie/{movie_id}/position' },
        },
        favorite: {
            list: { method: 'GET', path: 'movies/favorites/{id_user}' },
        }
    },
    genres: {
        list: { method: 'GET', path: '/genres' },
        get: { method: 'GET', path: '/genre/{id}' },
        create: { method: 'POST', path: '/genre' },
        update: { method: 'PUT', path: '/genre/{id}' },
        delete: { method: 'DELETE', path: '/genre/{id}' },
    }

} as const;