// Configuration for TMDB from https://api.themoviedb.org/3/configuration?api_key=687f4af88c405c0b881295bba3d4adfc

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '687f4af88c405c0b881295bba3d4adfc';

const IMAGE_BASE_URL ='https://image.tmdb.org/t/p/';

const SEARCH_TYPE ="multi";

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

const BACKEND_API_BASE_URL = "http://localhost:8888";

const BACKEND_REGISTER_URI = "/api/auth/register";

export {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE,
    SEARCH_TYPE,
    BACKEND_API_BASE_URL,
    BACKEND_REGISTER_URI,
}
