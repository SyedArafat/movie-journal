import React, {useState, useEffect} from 'react';
import '../../banner/Banner.css';
import {faMinus, faMinusCircle, faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import MovieRating from "../MovieRating";
import {
    BACKDROP_SIZE, BACKEND_IS_WATCHED_URI,
    BACKEND_LOGOUT_URI,
    BACKEND_MEDIA_CONTENT_API,
    BACKEND_REGISTER_URI,
    IMAGE_BASE_URL
} from "../../../config/config";
import WatchRibbon from "../../MoviePage/element/Ribbon/WatchRibbon";
import {contentTitle} from "../../../helpers";
import MovieKeyData from "../MovieKeyData";
import api from "../../../api/BackendApi";
import {DeleteToken, GetToken} from "../../../auth/Authentication";


function MovieModal({props, isTv, setLoading}) {
    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState(0);
    const [watched, setWatched] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            setMovie(props)
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
    }

    let wishlistClickEvent = async () => {
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": isTv ? "TV" : "MOVIE",
            "store_type": "wishlist",
        }
        await storeChoice(data);
        setLoading(false);
    }

    const storeChoice = async (data) => {
        try {
            let response = await api.post(`${BACKEND_MEDIA_CONTENT_API}`, data, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setSuccess(true);
            setError("");
            console.log(response);
        } catch (err) {
            setSuccess(false);
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Latter");
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
                    {movie?.overview}
                </div>

                <MovieRating storedRating={rating} isWatched={watched} setRating={setRating}/>

                <div className="modal-banner-buttons">
                    {!watched && <button onClick={watchClickEvent} className="banner-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button>}
                    {watched && <button onClick={watchClickEvent} className="banner-button update-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Update
                    </button>}
                    <Link onClick={() => {detailsClickEvent(isTv ? "/tv/" + movie.id : "/movie/" + movie.id)}} to={isTv ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                        <button  className="banner-button"><FontAwesomeIcon icon={faEye}/> {"\u00a0\u00a0"}
                            Details
                        </button>
                    </Link>
                    {(watched || inWishlist) && <button  className="banner-button remove-button"><FontAwesomeIcon icon={faMinusCircle}/> {"\u00a0\u00a0"}
                        Remove
                    </button>}
                    {!watched && !inWishlist && <button onClick={wishlistClickEvent} className="banner-button"><FontAwesomeIcon icon={faPlus}/> Watch List</button>}
                </div>


                <div className="title-info-talent">
                    <div className="title-data-info-item item-starring"><span
                        className="title-data-info-item-label">Starring:</span><span
                        className="title-data-info-item-list" data-uia="info-starring">Gulshan Devaiah, Kunaal Roy Kapur, Sagarika Ghatge</span>
                    </div>
                </div>
            </div>

            <div className="banner-fadeBottom"></div>
        </header>
    )
}

export default MovieModal;
