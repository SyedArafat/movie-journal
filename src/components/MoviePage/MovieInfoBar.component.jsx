import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {calcTime, convertMoney} from '../../helpers.js';
import './MovieInfoBar.styles.css';
import {
    faClock,
    faDollyBox,
    faExternalLinkAlt,
    faPodcast,
    faReceipt,
    faTvAlt
} from "@fortawesome/free-solid-svg-icons";

const MovieInfoBar = ({movie, time, budget, revenue}) => (
    <div className="rmdb-movieinfobar">
        <div className="rmdb-movieinfobar-content">
            <div className="rmdb-movieinfobar-content-col">
                {
                    (movie.media_type === "tv" || movie.number_of_seasons) ? <>
                            <FontAwesomeIcon className={"fa-time"} icon={faTvAlt} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Total Seasons: {movie.number_of_seasons}</span>
                        </>
                        : <>
                            <FontAwesomeIcon className={"fa-time"} icon={faClock} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Running time: {calcTime(time)}</span>
                        </>
                }
            </div>
            <div className="rmdb-movieinfobar-content-col">
                {
                    (movie.media_type === "tv" || movie.number_of_seasons) ? <>
                            <FontAwesomeIcon className={"fa-time"} icon={faExternalLinkAlt} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Total Episodes: {movie.number_of_episodes}</span>
                        </>
                        : <>
                            <FontAwesomeIcon className={"fa-budget"} icon={faDollyBox} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Budget: {convertMoney(budget)}</span>
                        </>
                }
            </div>
            <div className="rmdb-movieinfobar-content-col">
                {
                    (movie.media_type === "tv" || movie.number_of_seasons) ? <>
                            <FontAwesomeIcon className={"fa-time"} icon={faPodcast} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Status: {movie.status}</span>
                        </>
                        : <>
                            <FontAwesomeIcon className={"fa-revenue"} icon={faReceipt} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
                        </>
                }

            </div>
        </div>
    </div>
)

MovieInfoBar.propTypes = {
    movie: PropTypes.object,
    time: PropTypes.number,
    budget: PropTypes.number,
    revenue: PropTypes.number
}

export default MovieInfoBar;
