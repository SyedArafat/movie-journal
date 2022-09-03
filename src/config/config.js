// Configuration for TMDB from https://api.themoviedb.org/3/configuration?api_key=687f4af88c405c0b881295bba3d4adfc

const IMAGE_BASE_URL ='https://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

const BACKEND_API_BASE_URL = "http://localhost:8888";

const BACKEND_REGISTER_URI = "/api/auth/register";
const BACKEND_EXTERNAL_SEARCH = "/api/media/content/search/external";
const BACKEND_HOME_API_AUTH = "/api/users/home";
const BACKEND_HOME_API_NON_AUTH = "/api/public/home";
const BACKEND_MEDIA_CONTENT_API = "/api/media/content";
const BACKEND_MEDIA_REMOVE_API = "/api/media/content/remove";
const BACKEND_SEASON_DETAILS_API = "/api/media/tv/season"
const BACKEND_LOGIN_URI = "/api/auth/login";
const BACKEND_LOGOUT_URI = "/api/auth/logout";
const BACKEND_IS_WATCHED_URI = "/api/media/status";
const TOKEN_TAG = "movie_journal_user_token";
const NAME_TAG = "movie_journal_name";
const EXPIRES_AT_TAG = "movie_journal_expire_tag";

export {
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE,
    BACKEND_API_BASE_URL,
    BACKEND_REGISTER_URI,
    BACKEND_LOGIN_URI,
    BACKEND_LOGOUT_URI,
    TOKEN_TAG,
    NAME_TAG,
    EXPIRES_AT_TAG,
    BACKEND_MEDIA_CONTENT_API,
    BACKEND_IS_WATCHED_URI,
    BACKEND_MEDIA_REMOVE_API,
    BACKEND_HOME_API_AUTH,
    BACKEND_HOME_API_NON_AUTH,
    BACKEND_EXTERNAL_SEARCH,
    BACKEND_SEASON_DETAILS_API
}
