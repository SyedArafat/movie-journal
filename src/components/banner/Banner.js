import React, {useState, useEffect} from 'react';
import './Banner.css';
import {faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MovieKeyData from "../Movies/MovieKeyData";
import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../../config/config";
import {ApiGet} from "../../api/MediaContentClient";
import {DeleteToken} from "../../auth/Authentication";


function Banner({setLoading}) {
    const [movie, setMovie] = useState(false);

    useEffect(() => {
        let uri ="?component=banner";
        if(!movie) {
            setLoading(true);
            ApiGet(uri).then((response) => {
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

    return (
        <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner-buttons">
                    <button className="banner-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                        Play
                    </button>
                    <button className="banner-button"><FontAwesomeIcon icon={faPlus}/> Wish List</button>
                </div>
                <MovieKeyData movie={movie}/>

                <h1 className="banner-description">
                    {movie?.overview}
                </h1>


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

export default Banner;
