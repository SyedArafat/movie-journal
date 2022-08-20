import MovieThumb from "./MovieThumb.component";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config/config";
import Director from "./Director";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm, faPlayCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import MovieKeyData from "../Movies/MovieKeyData";
import MovieRating from "../Movies/MovieRating";
import WatchRibbon from "./element/Ribbon/WatchRibbon";
import {contentTitle} from "../../helpers";

function PageContent({movie, directors, type}) {
    return (
        <div className="rmdb-movieinfo-content">
            <WatchRibbon />

            <div className="rmdb-movieinfo-thumb">
                <MovieThumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
                    clickable={false}
                />
            </div>
            <div className="rmdb-movieinfo-text">
                <h2 style={{ fontSize: "2.1em"}}> {contentTitle(movie)} </h2>
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
                    <MovieRating dynamicClass = "watch-button-in-page"/>
                    <button className="banner-button watch-button"><FontAwesomeIcon
                        icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Watched
                    </button>
                </div>
                <button className="banner-button-movie-page"><FontAwesomeIcon icon={faPlus}/> Watch List</button>


            </div>
            <FontAwesomeIcon icon={faFilm} name="film" size="5x"/>
        </div>
    );
}

export default PageContent;
