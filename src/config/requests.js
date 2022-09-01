import {API_KEY} from "./config";

const requests = {
    fetchTrending: "?component=trending",
    fetchNetflixOriginals: "?component=netflix_originals",
    fetchTopRated: "?component=top_rated",
    recentWatched: "?component=recent_watched",
    recentWatchedMovies: "?component=recent_watched_movie",
    recentWatchedTV: "?component=recent_watched_tv",
    // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`

}

export default requests;

