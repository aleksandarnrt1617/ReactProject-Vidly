import http from "./httpService"
import { getGenres, getGenre } from "./genreService"
import { apiUrl } from "./config.json"

const apiEndpoint = "/movies"
function movieUrl(id) {
    return `${apiEndpoint}/${id}`

}

export async function getMovies() {
    const { data } = await http.get(apiEndpoint);
    return data;
}

export async function getMovie(id) {
    const { data } = await http.get(movieUrl(id));
    return data;
}

export async function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }

    return http.put(apiEndpoint, movie);
}

export async function deleteMovie(id) {
    const { data } = await http.delete(movieUrl(id))
    return data;
}