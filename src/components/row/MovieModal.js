import React, {useState, useEffect} from 'react';
import '../banner/Banner.css';
import {faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function MovieModal(props = null) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setMovie(props.props)
        }

        fetchData();
    }, [props]);

    return (
        <header className="modal-banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
        >
            <div className="model-banner-contents">
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

                <div className="modal-banner-buttons">
                    <button className="banner-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Play
                    </button>
                    <button className="banner-button"><FontAwesomeIcon icon={faPlus}/> Wish List</button>
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
