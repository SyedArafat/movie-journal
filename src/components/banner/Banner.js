import React, {useState, useEffect} from 'react';
import './Banner.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MovieKeyData from "../Movies/MovieKeyData";
import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../../config/config";
import {HomeApiGet} from "../../api/MediaContentClient";
import {DeleteToken} from "../../auth/Authentication";
import {contentTitle, movieTitle, releaseYear} from "../../helpers";
import {Link, useNavigate} from "react-router-dom";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import MovieThumb from "../MoviePage/MovieThumb.component";


function Banner({setLoading, movie}) {
    // const [movie, setMovie] = useState(false);

    // useEffect(() => {
    //     let uri = "?component=banner";
    //     if (!movie) {
    //         setLoading(true);
    //         HomeApiGet(uri).then((response) => {
    //             setMovie(response.data);
    //             setLoading(false);
    //
    //         }).catch((error) => {
    //             if (error.response.status === 401) {
    //                 DeleteToken();
    //                 window.location.reload();
    //             }
    //         })
    //     }
    // }, [movie]);

    let navigate = useNavigate();


    let detailsClickEvent = (parma) => {
        navigate(parma, {replace: true});
        window.location.reload();
    }

    return (
        (movie) ?
            <>
                <div className={"mobile-specific-banner"}>
                    <div className="rmdb-movieinfo"
                         style={{
                             background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
                         }}
                    >
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
                            <div style={{marginTop: "19px"}} className="banner-buttons">
                                <Link onClick={() => {
                                    detailsClickEvent(movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id)
                                }}
                                      to={movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                                    <button className="banner-button positive-button"><FontAwesomeIcon
                                        icon={faEye}/> {"\u00a0\u00a0"}
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <header className="banner"
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
                        <MovieKeyData movie={movie}/>
                        <div style={{marginTop: "19px"}} className="banner-buttons">
                            <Link onClick={() => {
                                detailsClickEvent(movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id)
                            }}
                                  to={movie.media_type === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id + "?from=internal"}>
                                <button className="banner-button positive-button"><FontAwesomeIcon
                                    icon={faEye}/> {"\u00a0\u00a0"}
                                    Details
                                </button>
                            </Link>
                        </div>

                        <h1 className="banner-description">
                            {movie?.overview}
                        </h1>
                        <h3>RATING</h3>
                        <div className="rmdb-rating">
                            <meter min="0" max="100" optimum="100" low="40" high="70"
                                   value={movie?.vote_average * 10}></meter>
                            <p className="rmdb-score">{parseFloat(movie?.vote_average).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="banner-fadeBottom"></div>


                </header>

            </>
            : null
    )
}

export default Banner;
