import {useState, useEffect} from 'react';
import axios from '../../axios';
import "./Row.css";
import CardWrapper from "../Movies/CardWrapper";
import CardImage from "..//Movies/CardImage";
import CardTitle from "../Movies/CardTitle";
import CardDescription from "../Movies/CardDescription";
import CardFeatureWrapper from "../Movies/CardFeatureWrapper";
import CardFeatureClose from "../Movies/CardFeatureClose";
import PlayerVideo from "../Movies/PlayerVideo";
import PlayButton from "../Header/PlayButton";
import PlayerOverlay from "../Movies/PlayerOverlay";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

import React from 'react';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);

            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <AllCardsWrapper>
                <div className="row-posters">
                    {movies.map(movie => (
                        <img
                            onClick={() => handleClick(movie)}
                            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                            key={movie.id}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>
            </AllCardsWrapper>
            {showCardFeature ? (
                <CardFeatureWrapper
                    style={{
                        backgroundImage: `url(${base_url}${activeItem.backdrop_path})`,

                    }}
                >
                    <CardTitle>{activeItem.name ? activeItem.name : activeItem.title}</CardTitle>
                    <CardDescription>{activeItem.overview}</CardDescription>
                    <CardFeatureClose onClick={() => setShowCardFeature(false)}/>
                    <PlayButton onClick={() => setShowPlayer(true)}>
                        <FontAwesomeIcon icon={faPlayCircle} /> {"\u00a0\u00a0"}
                        Play
                    </PlayButton>
                    {showPlayer ? (
                        <PlayerOverlay onClick={() => setShowPlayer(false)}>
                            <PlayerVideo src="../videos/video.mp4" type="video/mp4"/>
                        </PlayerOverlay>
                    ) : null}
                </CardFeatureWrapper>
            ) : null}
        </div>
    )
}

export default Row
