import React, {useState, useEffect} from 'react';
import '../../banner/Banner.css';
import {faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import MovieRating from "../MovieRating";
import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../../../config/config";
import WatchRibbon from "../../MoviePage/element/Ribbon/WatchRibbon";


function MovieModal({props, isTv}) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setMovie(props)
        }

        fetchData();
    }, [props, isTv]);

    let navigate = useNavigate();


    let detailsClickEvent = (parma) => {
        navigate(parma, { replace: true });
        window.location.reload();
        console.log(parma);
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

                <WatchRibbon />
                <div className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </div>

                <div className="title-info-metadata-wrapper" data-uia="title-info-metadata-wrapper"><span
                    className="title-info-metadata-item item-year" data-uia="item-year">2021</span><span
                    role="presentation" className="info-spacer"> | </span><span
                    className="title-info-metadata-item item-maturity" data-uia="item-maturity"><span
                    className="maturity-rating"><span className="maturity-number">18+ </span></span></span><span
                    role="presentation" className="info-spacer"> | </span><span
                    className="title-info-metadata-item item-runtime" data-uia="item-runtime"><span
                    className="duration">1h 54m</span></span><span role="presentation"
                                                                   className="info-spacer"> | </span><a
                    className="title-info-metadata-item item-genre" href="https://www.netflix.com/bd/browse/genre/58806"
                    data-uia="item-genre">Hindi-Language Movies</a>
                </div>

                <div className="banner-description">
                    {movie?.overview}
                </div>

                <MovieRating />

                <div className="modal-banner-buttons">
                    <button className="banner-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button>
                    <Link onClick={() => {detailsClickEvent(isTv ? "/tv/" + movie.id : "/movie/" + movie.id)}} to={isTv ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                        <button  className="banner-button"><FontAwesomeIcon icon={faEye}/> {"\u00a0\u00a0"}
                            Details
                        </button>
                    </Link>
                    <button className="banner-button"><FontAwesomeIcon icon={faPlus}/> Watch List</button>
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
