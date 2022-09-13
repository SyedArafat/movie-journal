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
import {faFilm, faMinusCircle, faPen, faPlayCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import MovieKeyData from "../Movies/MovieKeyData";
import MovieRating from "../Movies/MovieRating";
import WatchRibbon from "./element/Ribbon/WatchRibbon";
import {contentTitle} from "../../helpers";
import api from "../../api/BackendApi";
import {GetToken} from "../../auth/Authentication";
import RatingAndDate from "./RatingAndDate";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Loader from "../Loader";
import MovieModal from "../Movies/Modal/MovieModal";
import CardFeatureClose from "../Movies/CardFeatureClose";
import ReviewModal from "../Modal/ReviewModal";

function PageContent({movie, directors, type, personalChoice, setLoading, setSeasonDetails, setComment}) {
    const [rating, setRating] = useState(personalChoice.rating);
    const [review, setReview] = useState(personalChoice.review);
    const [watchedSeasons, setWatchedSeasons] = useState(personalChoice.watched_seasons);
    const [error, setError] = useState("");
    const [watched, setWatched] = useState(personalChoice?.watch_status);
    const [inWishlist, setInWishlist] = useState(personalChoice?.in_wishlist);
    const [date, setDate] = useState(personalChoice?.watched_time === null ? new Date() :
        new Date(personalChoice?.watched_time));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'black',
    };


    let watchClickEvent = async () => {
        if (!rating) {
            alert("Rating is missing");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify(movie),
            "type": type,
            "store_type": "watched",
            "rating": rating,
            "watched_date": date
        }
        await storeChoice(data);
        setWatched(true);
        setRating(rating);
        // setDate(date);
        if (type === "tv") {
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
            setDate(null);
            if (type === "tv") {
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
            if (!err?.response) {
                setError("No Server Response");
            } else if (err.response?.status === 400) {
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
        } catch (err) {
            if (!err?.response) {
                setError("No Server Response");
            } else if (err.response?.status === 400) {
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
    let reviewClickEvent = async () => {
        setOpen(true);
    }

    return (
        <div className="rmdb-movieinfo-content">

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id="modal-modal-description" sx={style}>
                    {/*<Loader loading={loading} />*/}
                    <ReviewModal
                        setUserComment={setComment}
                        storedReview={review}
                        setReview={setReview}
                        storedRating={rating}
                        storedDate={date}
                        movie={movie}
                        isTv={false}
                        setLoading={setLoading}
                        handleClose={handleClose}
                    />
                    <CardFeatureClose onClick={handleClose}/>
                </Box>
            </Modal>


            {watched && <WatchRibbon title={"Watched"}/>}
            {!watched && inWishlist &&
                <WatchRibbon position={"right"} dynamic_class={"wishlist"} title={"In Wishlist"}/>}

            <div className="rmdb-movieinfo-thumb">
                <MovieThumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
                    clickable={false}
                />
            </div>
            <div className="rmdb-movieinfo-text">
                <h2 style={{fontSize: "2em", marginBottom: ".6em"}}> {contentTitle(movie)} </h2>
                <MovieKeyData movie={movie}/>
                <p>{movie.overview}</p>
                <h3>TMDB RATING</h3>
                <RatingAndDate watched_date={date} movie={movie} setDate={setDate}/>
                {type === "movie" && <Director directors={directors}/>}

                <div style={{display: "flex"}}>
                    <h3 style={{marginRight: "1em"}}>Personal Rating:</h3>
                    <MovieRating dynamicClass={"padding-11"} storedRating={rating} isWatched={watched}
                                 setRating={setRating}/>
                    {type === "tv" && watchedSeasons && (
                        <div className={"watched-seasons"}>Watched Seasons: <span>{watchedSeasons}</span></div>
                    )}
                </div>

                <div className="modal-banner-buttons padding-left-0">
                    {!watched &&
                        <button onClick={watchClickEvent} className="banner-button positive-button"><FontAwesomeIcon
                            icon={faPlayCircle}/> {"\u00a0\u00a0"}
                            Watched
                        </button>}
                    {watched &&
                        <button onClick={watchClickEvent} className="banner-button update-button"><FontAwesomeIcon
                            icon={faPlayCircle}/> {"\u00a0\u00a0"}
                            Update
                        </button>}
                    {(watched || inWishlist) &&
                        <button onClick={removeClickEvent} className="banner-button remove-button"><FontAwesomeIcon
                            icon={faMinusCircle}/> {"\u00a0\u00a0"}
                            Remove
                        </button>}
                    {!watched && !inWishlist &&
                        <button onClick={wishlistClickEvent} className="banner-button positive-button"><FontAwesomeIcon
                            icon={faPlus}/> Watch List</button>}
                    <button onClick={reviewClickEvent} className="banner-button positive-button"><FontAwesomeIcon
                        icon={faPen}/> {"\u00a0\u00a0"}
                        Review
                    </button>
                </div>

            </div>
            <FontAwesomeIcon icon={faFilm} name="film" size="5x"/>

        </div>
    );
}

export default PageContent;
