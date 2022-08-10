import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import requests from '../../requests';
import './Banner.css';
import {faPlayCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            // console.log(request.data.results[2]);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
        }
        fetchData();
    }, []);

    return (
        <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name ||  movie?.original_name}
                </h1>
                <div className = "banner-buttons">
                    <button className="banner-button"><FontAwesomeIcon icon={faPlayCircle} /> {"\u00a0\u00a0"}
                        Play</button>
                    <button className="banner-button"> <FontAwesomeIcon icon={faPlus}/> Wish List</button>
                </div>

                <h1 className="banner-description">
                    {movie?.overview}
                </h1>
            </div> 
            
            <div className="banner-fadeBottom"></div>
        </header>
    )
}

export default Banner;
