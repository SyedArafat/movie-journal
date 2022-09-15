import {useState, useEffect} from 'react';
import "./Row.css";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import React from 'react';
import {IMAGE_BASE_URL} from "../../config/config";
import ConditionalMovieModalWrapper from "../Movies/Modal/ConditionalMovieModalWrapper";
import {HomeApiGet} from "../../api/MediaContentClient";
import {DeleteToken} from "../../auth/Authentication";

const base_url = `${IMAGE_BASE_URL}w500`;

const sideScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        // console.log(element.scrollWidth);
        // console.log(element.clientWidth);
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
            clearInterval(slideTimer);
        }
    }, 18);
};

const showScroll = (element) => {
    return (element?.scrollWidth > element?.clientWidth);
}


function Row({title, fetchUrl, isLargeRow, setLoading}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [movies, setMovies] = useState([]);
    const [isTV, setIsTV] = useState(false);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        setLoading(true);
        HomeApiGet(fetchUrl).then((response) => {
            setMovies(response.data);
            setLoading(false);

        }).catch((error) => {
            if (error.response.status === 401) {
                DeleteToken();
                window.location.reload();
            }
        })
    }, [fetchUrl, reload]);

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
        if (movie.media_type === "tv") {
            setIsTV(true);
        } else {
            setIsTV(false);
        }

        handleOpen();
    }
    const contentWrapper = React.useRef(null);

    return (<div className="row">
        {movies.length !== 0 ? <>
            <div>
                <h2>{title}</h2>
            </div>
            <AllCardsWrapper>
                {showScroll(contentWrapper.current) && <button className="handle left-handle">
                    <div
                        onClick={() => {
                            sideScroll(contentWrapper.current, 10, 300, -20);
                        }}
                        className="text">&#8249;</div>
                </button>}
                <div className="row-posters" ref={contentWrapper}>
                    {movies.map(movie => (
                        <div key={movie.id} className={`row-poster ${isLargeRow && "row-posterLarge"}`}>
                            <img
                                onClick={() => handleClick(movie)}
                                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                key={movie.id}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        </div>))}

                </div>
                <button className="handle right-handle">
                    {showScroll(contentWrapper.current) && <div
                        onClick={() => {
                            sideScroll(contentWrapper.current, 10, 300, 20);
                        }}
                        className="text">&#8250;</div>}
                </button>
            </AllCardsWrapper>
        </> : null}
        {showCardFeature ? <ConditionalMovieModalWrapper setIsUpdated={setReload} modalOpen={open}
                                                         onClose={() => setOpen(false)}
                                                         activeItem={activeItem} isTV={isTV}/> : null}

    </div>)
}

export default Row
