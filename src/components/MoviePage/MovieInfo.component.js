import React from 'react';
import {IMAGE_BASE_URL, BACKDROP_SIZE} from '../../config/config';
import PropTypes from 'prop-types';
import './MovieInfo.styles.css';
import PageContent from "./PageContent";

const MovieInfo = ({movie, directors, type, personalChoice, setLoading, setSeasonDetails, setComment}) => (
    <div className="rmdb-movieinfo"
         style={{
             background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
         }}
    >
        <PageContent
            setSeasonDetails={setSeasonDetails}
            setComment={setComment}
            setLoading={setLoading}
            movie={movie}
            type={type}
            directors={directors}
            personalChoice={personalChoice}
        />
    </div>
)

MovieInfo.propTypes = {
    movie: PropTypes.object,
    directors: PropTypes.array
}

export default MovieInfo;
