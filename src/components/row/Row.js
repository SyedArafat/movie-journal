import {useState, useEffect} from 'react';
import axios from '../../axios';
import "./Row.css";
import AllCardsWrapper from "../Movies/AllCardsWrapper";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import MovieModal from "./MovieModal";
import CardFeatureClose from "../Movies/CardFeatureClose";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [movies, setMovies] = useState([]);
    const [showCardFeature, setShowCardFeature] = useState(false);
    const [activeItem, setActiveItem] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);

            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: 'black',
        border: '2px solid #000',
    };

    const handleClick = (movie) => {
        setShowCardFeature(true);
        setActiveItem(movie);
        handleOpen();
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
            {showCardFeature ?
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box id="modal-modal-description" sx={style}>
                        <MovieModal props={activeItem}/>
                        <CardFeatureClose onClick={() => setShowCardFeature(false)} />*/}
                    </Box>
                </Modal> : null}

        </div>
    )
}

export default Row
