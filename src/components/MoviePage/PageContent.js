import MovieThumb from "./MovieThumb.component";
import {
    BACKEND_IS_WATCHED_URI,
    BACKEND_MEDIA_CONTENT_API,
    BACKEND_MEDIA_REMOVE_API,
    IMAGE_BASE_URL,
    POSTER_SIZE
} from "../../config/config";
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

function PageContent({movie, directors, type, personalChoice, setLoading, setSeasonDetails}) {
    const [rating, setRating] = useState(personalChoice.rating);
    const [watchedSeasons, setWatchedSeasons] = useState(personalChoice.watched_seasons);
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
            "type": type,
            "store_type": "watched",
            "rating": rating,
        }
        await storeChoice(data);
        setWatched(true);
        setRating(rating);
        if(type === "tv") {
            await api.get(`${BACKEND_IS_WATCHED_URI}/${type}/${movie.id}`, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            }).then(response => {
                setSeasonDetails(response.data?.seasons);
                setWatchedSeasons(response.data?.watched_seasons);

            }).catch(err => {
                // console.log(GetToken());
            });
        }
        setLoading(false);

        // window.location.reload();
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
            if(type === "tv") {
                await api.get(`${BACKEND_IS_WATCHED_URI}/${type}/${movie.id}`, {
                    "headers": {
                        "Authorization": `Bearer ${GetToken()}`
                    }
                }).then(response => {
                    setSeasonDetails(response.data?.seasons);
                    setWatchedSeasons(response.data?.watched_seasons);
                }).catch(err => {
                    // console.log(GetToken());
                });
                setWatchedSeasons(false);
                setSeasonDetails(false);

            }
        } catch (err) {
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Later");
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
                setError("Something Went Wrong! Try again Later");
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
                <h2 style={{fontSize: "2em", marginBottom:".6em"}}> {contentTitle(movie)} </h2>
                <MovieKeyData movie={movie}/>
                <p>{movie.overview}</p>
                <h3>TMDB RATING</h3>
                <div className="rmdb-rating">
                    <meter min="0" max="100" optimum="100" low="40" high="70" value={movie.vote_average * 10}></meter>
                    <p className="rmdb-score">{parseFloat(movie.vote_average).toFixed(2)}</p>
                </div>
                {type === "movie" && <Director directors={directors}/>}

                <div style={{display: "flex"}}>
                    <h3 style={{marginRight: "1em"}}>Personal Rating:</h3>
                    <MovieRating dynamicClass={"padding-11"} storedRating={rating} isWatched={watched} setRating={setRating}/>
                    {type === "tv" && watchedSeasons && (
                        <div className={"watched-seasons"}>Watched Seasons: <span>{watchedSeasons}</span> </div>
                    )}
                </div>

                <div className="modal-banner-buttons padding-left-0">
                    {!watched && <button onClick={watchClickEvent} className="banner-button positive-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button>}
                    {watched && <button onClick={watchClickEvent} className="banner-button update-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Update
                    </button>}
                    {(watched || inWishlist) && <button onClick={removeClickEvent} className="banner-button remove-button"><FontAwesomeIcon icon={faMinusCircle}/> {"\u00a0\u00a0"}
                        Remove
                    </button>}
                    {!watched && !inWishlist && <button onClick={wishlistClickEvent} className="banner-button positive-button"><FontAwesomeIcon icon={faPlus}/> Watch List</button>}
                </div>

            </div>
            <FontAwesomeIcon icon={faFilm} name="film" size="5x"/>
        </div>
    );
}

export default PageContent;
