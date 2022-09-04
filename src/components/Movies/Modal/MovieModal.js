import React, {useState, useEffect} from 'react';
import '../../banner/Banner.css';
import {faMinusCircle, faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import MovieRating from "../MovieRating";
import {
    BACKDROP_SIZE, BACKEND_IS_WATCHED_URI,
    BACKEND_MEDIA_CONTENT_API, BACKEND_MEDIA_REMOVE_API,
    IMAGE_BASE_URL
} from "../../../config/config";
import WatchRibbon from "../../MoviePage/element/Ribbon/WatchRibbon";
import {contentTitle, trimmedOverview} from "../../../helpers";
import MovieKeyData from "../MovieKeyData";
import api from "../../../api/BackendApi";
import {Authed, GetToken} from "../../../auth/Authentication";


function MovieModal({props, isTv, setLoading, setIsUpdated}) {
    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState(0);
    const [watched, setWatched] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            setMovie(props)
            if(Authed()) {
                setLoading(true);
                let type = isTv ? "tv" : "movie";
                await api.get(`${BACKEND_IS_WATCHED_URI}/${type}/${props.id}`, {
                    "headers": {
                        "Authorization": `Bearer ${GetToken()}`
                    }
                }).then(response => {
                    setWatched(response.data.watch_status);
                    setRating(response.data.rating);
                    setInWishlist(response.data.in_wishlist);
                }).catch(err => {
                    // console.log(GetToken());
                });
                setLoading(false);
            }
        }

        fetchData();
    }, [props, isTv]);

    let navigate = useNavigate();


    let detailsClickEvent = (parma) => {
        navigate(parma, { replace: true });
        window.location.reload();
    }

    let watchClickEvent = async () => {
        if(!rating) {
            alert("Rating is missing");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": isTv ? "TV" : "MOVIE",
            "store_type": "watched",
            "rating": rating,
        }
        await storeChoice(data);
        setLoading(false);
        setWatched(true);
        // window.location.reload();
    }

    let wishlistClickEvent = async () => {
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": isTv ? "TV" : "MOVIE",
            "store_type": "wishlist",
        }
        await storeChoice(data);
        setInWishlist(true);
        setLoading(false);

    }

    let removeClickEvent = async () => {
        setLoading(true);
        let type = isTv ? "tv" : "movie";
        let media_id = movie.id;
        try {
            let response = await api.post(`${BACKEND_MEDIA_REMOVE_API}/${type}/${media_id}`, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setSuccess(true);
            setInWishlist(false);
            setWatched(false);
            setRating(0);
            setError("");
            setIsUpdated(true);
        } catch (err) {
            setSuccess(false);
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
            await api.post(`${BACKEND_MEDIA_CONTENT_API}`, data, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setSuccess(true);
            setError("");
        } catch (err) {
            setSuccess(false);
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Later");
            }
        }
    }

    return (
        <header className="modal-banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                    outline: "none"
                }}
        >

            <div className="model-banner-contents">

                {watched && <WatchRibbon title={"Watched"} />}
                {!watched && inWishlist && <WatchRibbon dynamic_class={"wishlist"} title={"In Wishlist"}/>}
                <div className="banner-title">
                    { contentTitle(movie)}
                </div>
                <MovieKeyData movie={movie} />

                <div className="banner-description">
                    {trimmedOverview(movie?.overview)}
                </div>

                <h3>RATING</h3>
                <div className="rmdb-rating">
                    <meter min="0" max="100" optimum="100" low="40" high="70" value={movie.vote_average * 10}></meter>
                    <p className="rmdb-score">{parseFloat(movie.vote_average).toFixed(2)}</p>
                </div>

                {Authed() && <MovieRating storedRating={rating} isWatched={watched} setRating={setRating}/>}

                <div className="modal-banner-buttons">
                    {!watched && Authed() && <button onClick={watchClickEvent} className="banner-button positive-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button>}
                    {watched && <button onClick={watchClickEvent} className="banner-button update-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Update
                    </button>}
                    <Link onClick={() => {detailsClickEvent(isTv ? "/tv/" + movie.id : "/movie/" + movie.id)}} to={isTv ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                        <button  className="banner-button positive-button"><FontAwesomeIcon icon={faEye}/> {"\u00a0\u00a0"}
                            Details
                        </button>
                    </Link>
                    {(watched || inWishlist) && <button onClick={removeClickEvent} className="banner-button remove-button"><FontAwesomeIcon icon={faMinusCircle}/> {"\u00a0\u00a0"}
                        Remove
                    </button>}
                    {!watched && Authed() && !inWishlist && <button onClick={wishlistClickEvent} className="banner-button positive-button"><FontAwesomeIcon icon={faPlus}/> Watch List</button>}
                </div>


                {/*<div className="title-info-talent">*/}
                {/*    <div className="title-data-info-item item-starring"><span*/}
                {/*        className="title-data-info-item-label">Starring:</span><span*/}
                {/*        className="title-data-info-item-list" data-uia="info-starring">Gulshan Devaiah, Kunaal Roy Kapur, Sagarika Ghatge</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="banner-fadeBottom"></div>
        </header>
    )
}

export default MovieModal;
