import React from "react";

function MovieKeyData({movie}) {
    return (
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
    );
}

export default MovieKeyData;
