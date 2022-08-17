import {IMAGE_BASE_URL} from "../../config/config";
import React from "react";
import BadgeWatch from "../Movies/BadgeWatch";

function SearchedMovies({movie}) {
    console.log(movie);
    const POSTER_SIZE = "w342";

    return (
        <div className="rmdb-actor search-movie">
            <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
                alt="actorthumb"
            />
            {/*<BadgeWatch />*/}

            <span className="rmdb-actor-name">{movie?.title || movie?.name || movie?.original_name} (2022)</span>
            {/*<span className="rmdb-actor-character">{movies.character}</span>*/}
        </div>
    )
}

export default SearchedMovies;
