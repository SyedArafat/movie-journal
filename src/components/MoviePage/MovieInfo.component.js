import React from 'react';
import {IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config/config';
import PropTypes from 'prop-types';
import './MovieInfo.styles.css';
import PageContent from "./PageContent";

const MovieInfo = ({movie, directors, type}) => (
    <div className="rmdb-movieinfo"
         style={{
             background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
         }}
    >
        <PageContent movie={movie} type={type} directors={directors}/>
    </div>
)

MovieInfo.propTypes = {
    movie: PropTypes.object,
    directors: PropTypes.array
}

export default MovieInfo;
