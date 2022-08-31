import {useState, useEffect} from 'react';
import axios from '../../axios';
import "./Row.css";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import React from 'react';
import {IMAGE_BASE_URL} from "../../config/config";
import BadgeWatch from "../Movies/BadgeWatch";
import ConditionalMovieModalWrapper from "../Movies/Modal/ConditionalMovieModalWrapper";
import api from "../../api/BackendApi";

const base_url = `${IMAGE_BASE_URL}w500`;

function Row({title, fetchUrl, isLargeRow}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [movies, setMovies] = useState([]);
    const [isTV, setIsTV] = useState(false);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);


    useEffect(() => {
        async function fetchData() {
            await api.get(fetchUrl).then((response) => {
                setMovies(response.data);
            });
        }

        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
        if (movie.first_air_date !== undefined) {
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
                            <BadgeWatch/>
                        </div>
                    ))}

                </div>
            </AllCardsWrapper>
            {
                showCardFeature ?
                    <ConditionalMovieModalWrapper modalOpen={open} onClose={() => setOpen(false)} activeItem={activeItem} isTV={isTV}/>
                    : null
            }
            {/*{showCardFeature ?*/}
            {/*    <Modal*/}
            {/*        open={open}*/}
            {/*        onClose={handleClose}*/}
            {/*        aria-labelledby="modal-modal-title"*/}
            {/*        aria-describedby="modal-modal-description"*/}
            {/*    >*/}
            {/*        <Box id="modal-modal-description" sx={style}>*/}
            {/*            <MovieModal props={activeItem} isTv={isTV}/>*/}
            {/*            <CardFeatureClose onClick={() => setShowCardFeature(false)}/>*/}
            {/*        </Box>*/}
            {/*    </Modal> : null}*/}

        </div>
    )
}

export default Row
