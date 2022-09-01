import {API_KEY, API_URL, BACKEND_HOME_API_AUTH} from "./config";
import {Authed} from "../auth/Authentication";

let dataSource = Authed ? "internal" : "external";

const requests = {
    fetchTrending: BACKEND_HOME_API_AUTH+"?component=trending",
    fetchNetflixOriginals: BACKEND_HOME_API_AUTH+"?component=netflix_originals",
    fetchTopRated: BACKEND_HOME_API_AUTH+"?component=top_rated",
    // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`

}

export default requests;

