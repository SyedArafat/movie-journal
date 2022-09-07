import React, {useState, useEffect} from 'react';
import './Banner.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MovieKeyData from "../Movies/MovieKeyData";
import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../../config/config";
import {HomeApiGet} from "../../api/MediaContentClient";
import {DeleteToken} from "../../auth/Authentication";
import {movieTitle, releaseYear} from "../../helpers";
import {Link, useNavigate} from "react-router-dom";
import {faEye} from "@fortawesome/free-regular-svg-icons";


function Banner({setLoading}) {
    const [movie, setMovie] = useState(false);

    useEffect(() => {
        let uri ="?component=banner";
        if(!movie) {
            setLoading(true);
            HomeApiGet(uri).then((response) => {
                setMovie(response.data);
                setLoading(false);

            }).catch((error) => {
                if(error.response.status === 401) {
                    DeleteToken();
                    window.location.reload();
                }
            })
        }
    }, [movie]);

    let navigate = useNavigate();


    let detailsClickEvent = (parma) => {
        navigate(parma, { replace: true });
        window.location.reload();
    }

    return (
        (movie) ? <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: movie.backdrop_path ? `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie?.backdrop_path}")` : "#000",
                    backgroundPosition: "center center"
                }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">
                    {movieTitle(movie) + " (" + releaseYear(movie)})
                </h1>
                <MovieKeyData  movie={movie}/>
                <div style={{ marginTop: "19px" }} className="banner-buttons">
                    <Link onClick={() => {detailsClickEvent(movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id)}} to={movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                        <button  className="banner-button positive-button"><FontAwesomeIcon icon={faEye}/> {"\u00a0\u00a0"}
                            Details
                        </button>
                    </Link>
                </div>

                <h1 className="banner-description">
                    {movie?.overview}
                </h1>
                <h3>RATING</h3>
                <div className="rmdb-rating">
                    <meter min="0" max="100" optimum="100" low="40" high="70" value={movie.vote_average * 10}></meter>
                    <p className="rmdb-score">{parseFloat(movie.vote_average).toFixed(2)}</p>
                </div>

                {/*<div className="title-info-talent">*/}
                {/*    <div className="title-data-info-item item-starring"><span*/}
                {/*        className="title-data-info-item-label">Starring:</span><span*/}
                {/*        className="title-data-info-item-list" data-uia="info-starring">Gulshan Devaiah, Kunaal Roy Kapur, Sagarika Ghatge</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="banner-fadeBottom"></div>
        </header> : null
    )
}

export default Banner;
