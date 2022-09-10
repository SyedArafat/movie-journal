import {IMAGE_BASE_URL} from "../../config/config";
import React, {useState} from "react";
import BadgeWatch from "../Movies/BadgeWatch";
import ConditionalMovieModalWrapper from "../Movies/Modal/ConditionalMovieModalWrapper";
import {contentTitle} from "../../helpers";

function SearchedMovies({movie}) {

    const POSTER_SIZE = "w342";

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [isTV, setIsTV] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const handleClick = (movie) => {
        if(movie.media_type === "person") return false;
        setShowCardFeature(true);
        setActiveItem(movie);
        if (movie.first_air_date !== undefined) {
            setIsTV(true);
        }

        handleOpen();
    }

    return (
        <div className="rmdb-actor search-movie">
            <img
                onClick={() => handleClick(movie)}
                src={movie.poster_path || movie.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie?.poster_path || movie?.profile_path }` : `${process.env.PUBLIC_URL}/images/no_image.jpg`}
                alt="Poster Thumb"
            />
            {/*<BadgeWatch />*/}

            <span className="rmdb-actor-name"> {contentTitle(movie)} </span>
            {
                showCardFeature ?
                    <ConditionalMovieModalWrapper from={"search"} modalOpen={open} onClose={() => setOpen(false)} activeItem={activeItem} isTV={isTV}/>
                    : null
            }

        </div>
    )
}

export default SearchedMovies;
