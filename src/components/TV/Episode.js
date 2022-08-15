import React from 'react';
import { IMAGE_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types';
import './EpisodeStyle.css';
import {format} from "date-fns";

const Episode = ({ episode }) => {

    const POSTER_SIZE = "w342";

    return (
        <div className="episode-box">
            <img
                src={episode.still_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${episode.still_path}` : './images/no_image.jpg'}
                alt="actorthumb"
            />
            <div className={"episode-metadata"}>
            <span className="episode-title">{episode.episode_number + "." + episode.name}</span>
            {/*<span className="episode-title">{episode.episode_number + "." + episode.name}</span>*/}
            </div>
            <div className={"episode-air-date"}>{format(new Date(Date.parse(episode.air_date)), 'do LLL YYY')}</div>

            <span className="episode-synopsis">{episode.overview}</span>
        </div>
    )
}

Episode.propTypes = {
    actor: PropTypes.object
}

export default Episode;
