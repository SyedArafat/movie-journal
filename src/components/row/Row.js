import {useState, useEffect} from 'react';
import "./Row.css";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import React from 'react';
import {IMAGE_BASE_URL} from "../../config/config";
import ConditionalMovieModalWrapper from "../Movies/Modal/ConditionalMovieModalWrapper";
import {HomeApiGet} from "../../api/MediaContentClient";
import {DeleteToken} from "../../auth/Authentication";
import {useNavigate} from "react-router-dom";
import {getMediaType} from "../../helpers";

const base_url = `${IMAGE_BASE_URL}w500`;


function Row({title, fetchUrl, isLargeRow, setLoading, movies}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // const [movies, setMovies] = useState(data);
    const [isTV, setIsTV] = useState(false);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const [reload, setReload] = useState(false);
    const [showScrolls, setShowScrolls] = useState(false);
    console.log(movies)

    const [isMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();


    // useEffect(() => {
    //     setLoading(true);
    //     HomeApiGet(fetchUrl).then((response) => {
    //         // if (fetchUrl === "") {
    //         //     console.log(response)
    //         // }
    //         setMovies(response.data);
    //         setLoading(false);
    //
    //     }).catch((error) => {
    //         if (error.response.status === 401) {
    //             DeleteToken();
    //             window.location.reload();
    //         }
    //     })
    // }, [fetchUrl, reload]);

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
        setIsTV(getMediaType(movie) === "tv");

        if(isMobile) {
            navigate(getMediaType(movie) === "tv" ? "/tv/" + movie.id : "/movie/" + movie.id);
        }

        handleOpen();
    }
    const contentWrapper = React.useRef(null);

    const sideScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, 18);
    };

    const showScroll = (element) => {
        if (element?.scrollWidth > element?.clientWidth) {
            setShowScrolls(true);
        }
    }

    return (<div className="row" onMouseEnter={() => {showScroll(contentWrapper.current)}} onMouseLeave={() => {setShowScrolls(false)}}>
        {movies.length !== 0 ? <>
            <div>
                <h2>{title}</h2>
            </div>
            <AllCardsWrapper>
                {!showScrolls && <button style={{ visibility: "hidden"}} className="handle left-handle">
                    <div
                        onClick={() => {
                            sideScroll(contentWrapper.current, 10, 300, -20);
                        }}
                        className="text">&#8249;</div>
                </button>

                }
                {showScrolls && <button className="handle left-handle">
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
                {!showScrolls && <button style={{visibility: "hidden"}} className="handle right-handle">
                    <div
                        onClick={() => {
                            sideScroll(contentWrapper.current, 10, 300, 20);
                        }}
                        className="text">&#8250;</div>
                </button>}
                {showScrolls && <button className="handle right-handle">
                    <div
                        onClick={() => {
                            sideScroll(contentWrapper.current, 10, 300, 20);
                        }}
                        className="text">&#8250;</div>
                </button>}
            </AllCardsWrapper>
        </> : null}
        {showCardFeature ? <ConditionalMovieModalWrapper setIsUpdated={setReload} modalOpen={open}
                                                         onClose={() => setOpen(false)}
                                                         activeItem={activeItem} isTV={isTV}/> : null}

    </div>)
}

export default Row
