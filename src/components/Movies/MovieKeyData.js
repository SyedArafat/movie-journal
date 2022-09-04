import React from "react";
import {language, releaseDate} from "../../helpers";

function MovieKeyData({movie}) {
    return (
        <div className="title-info-metadata-wrapper" data-uia="title-info-metadata-wrapper"><span
            className="title-info-metadata-item item-year" data-uia="item-year">{movie ? releaseDate(movie) : null}</span><span
            role="presentation" className="info-spacer"> | </span><span
            className="title-info-metadata-item item-maturity" data-uia="item-maturity"><span
            className="maturity-rating"><span className="maturity-number">All </span></span></span><span
            role="presentation" className="info-spacer"> | </span><span
            className="title-info-metadata-item item-runtime" data-uia="item-runtime"><span
            className="duration">{movie.media_type ? movie.media_type.toUpperCase() : ""}</span></span><span role="presentation"
                                                           className="info-spacer"> | </span><a
            className="title-info-metadata-item item-genre" href="https://www.netflix.com/bd/browse/genre/58806"
            data-uia="item-genre">{language(movie["original_language"])}</a>
        </div>
    );
}

export default MovieKeyData;
