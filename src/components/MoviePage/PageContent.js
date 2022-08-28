import MovieThumb from "./MovieThumb.component";
import {BACKEND_MEDIA_CONTENT_API, BACKEND_MEDIA_REMOVE_API, IMAGE_BASE_URL, POSTER_SIZE} from "../../config/config";
import Director from "./Director";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm, faMinusCircle, faPlayCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import MovieKeyData from "../Movies/MovieKeyData";
import MovieRating from "../Movies/MovieRating";
import WatchRibbon from "./element/Ribbon/WatchRibbon";
import {contentTitle} from "../../helpers";
import api from "../../api/BackendApi";
import {GetToken} from "../../auth/Authentication";

function PageContent({movie, directors, type, personalChoice, setLoading}) {
    const [rating, setRating] = useState(personalChoice.rating);
    const [error, setError] = useState("");
    const [watched, setWatched] = useState(personalChoice?.watch_status);
    const [inWishlist, setInWishlist] = useState(personalChoice?.in_wishlist);

    let watchClickEvent = async () => {
        if(!rating) {
            alert("Rating is missing");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            // "type": isTv ? "TV" : "MOVIE",
            "type": type,
            "store_type": "watched",
            "rating": rating,
        }
        await storeChoice(data);
        setLoading(false);
        setWatched(true);
        setRating(rating);
    }
    let removeClickEvent = async () => {
        setLoading(true);
        let media_id = movie.id;
        try {
            await api.post(`${BACKEND_MEDIA_REMOVE_API}/${type}/${media_id}`, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setInWishlist(false);
            setWatched(false);
            setRating(0);
            setError("");
        } catch (err) {
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Latter");
            }
        }
        setLoading(false);
    }
    const storeChoice = async (data) => {
        try {
            let response = await api.post(`${BACKEND_MEDIA_CONTENT_API}`, data, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            console.log(response);
        } catch (err) {
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Latter");
            }
        }
    }
    let wishlistClickEvent = async () => {
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": type,
            "store_type": "wishlist",
        }
        await storeChoice(data);
        setInWishlist(true);
        setLoading(false);
    }
    return (
        <div className="rmdb-movieinfo-content">
            {watched && <WatchRibbon title={"Watched"} />}
            {!watched && inWishlist && <WatchRibbon position={"right"} dynamic_class={"wishlist"} title={"In Wishlist"}/>}

            <div className="rmdb-movieinfo-thumb">
                <MovieThumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
                    clickable={false}
                />
            </div>
            <div className="rmdb-movieinfo-text">
                <h2 style={{fontSize: "2.1em"}}> {contentTitle(movie)} </h2>
                <MovieKeyData movie={movie}/>
                <p>{movie.overview}</p>
                <h3>TMDB RATING</h3>
                <div className="rmdb-rating">
                    <meter min="0" max="100" optimum="100" low="40" high="70" value={movie.vote_average * 10}></meter>
                    <p className="rmdb-score">{parseFloat(movie.vote_average).toFixed(2)}</p>
                </div>
                {type === "movie" && <Director directors={directors}/>}
                <div>
                    <h3>Personal Rating</h3>
                    <MovieRating storedRating={rating} setRating={setRating} dynamicClass="watch-button-in-page"/>
                    { !watched && <button onClick={watchClickEvent} className="banner-button watch-button"><FontAwesomeIcon
                        icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button> }
                </div>
                { !watched && !inWishlist && <button onClick={wishlistClickEvent} className="banner-button-movie-page"><FontAwesomeIcon icon={faPlus}/> Watch List</button> }
                {(watched || inWishlist) && <button onClick={removeClickEvent} className="banner-button watch-button remove-button"><FontAwesomeIcon icon={faMinusCircle}/> {"\u00a0\u00a0"}
                    Remove
                </button>}

            </div>
            <FontAwesomeIcon icon={faFilm} name="film" size="5x"/>
        </div>
    );
}

export default PageContent;
