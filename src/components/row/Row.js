import {useState, useEffect} from 'react';
import "./Row.css";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import React from 'react';
import {IMAGE_BASE_URL} from "../../config/config";
import ConditionalMovieModalWrapper from "../Movies/Modal/ConditionalMovieModalWrapper";
import {ApiGetWithAuth} from "../../api/MediaContentClient";

const base_url = `${IMAGE_BASE_URL}w500`;

function Row({title, fetchUrl, isLargeRow, setLoading}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [movies, setMovies] = useState([]);
    const [isTV, setIsTV] = useState(false);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);


    useEffect(() => {
        setLoading(true);
        ApiGetWithAuth(fetchUrl).then((response) => {
            setMovies(response.data);
            setLoading(false);

        }).catch((error) => {

        })
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
        if (movie.media_type === "tv") {
            setIsTV(true);
        }

        handleOpen();
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <AllCardsWrapper>
                <div className="row-posters">
                    {movies.map(movie => (
                        <div key={movie.id} className={`row-poster ${isLargeRow && "row-posterLarge"}`}>
                            <img
                                onClick={() => handleClick(movie)}
                                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                key={movie.id}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        </div>
                    ))}

                </div>
            </AllCardsWrapper>
            {
                showCardFeature ?
                    <ConditionalMovieModalWrapper modalOpen={open} onClose={() => setOpen(false)} activeItem={activeItem} isTV={isTV}/>
                    : null
            }

        </div>
    )
}

export default Row
