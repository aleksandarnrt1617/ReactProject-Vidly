import http from "./httpService"
import { getGenres, getGenre } from "./genreService"
import { apiUrl } from "./config.json"

const apiEndpoint = "/users"

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}