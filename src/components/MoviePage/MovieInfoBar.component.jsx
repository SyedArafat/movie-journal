import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { calcTime, convertMoney } from '../../helpers.js';
import './MovieInfoBar.styles.css';
import {faClock, faDollyBox, faReceipt} from "@fortawesome/free-solid-svg-icons";

const MovieInfoBar = ({ time, budget, revenue }) => (
  <div className="rmdb-movieinfobar">
    <div className="rmdb-movieinfobar-content">
      <div className="rmdb-movieinfobar-content-col">
        <FontAwesomeIcon className={"fa-time"} icon={faClock} size={"2x"} />
        <span className="rmdb-movieinfobar-info">Running time: {calcTime(time)}</span>

      </div>
      <div className="rmdb-movieinfobar-content-col">
        <FontAwesomeIcon className={"fa-budget"} icon={faDollyBox} size={"2x"} />
        <span className="rmdb-movieinfobar-info">Budget: {convertMoney(budget)}</span>
      </div>
      <div className="rmdb-movieinfobar-content-col">
        <FontAwesomeIcon className={"fa-revenue"} icon={faReceipt} size={"2x"} />

        {/*<FontAwesome className="fa-revenue" name="ticket" size="2x" />*/}
        <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
      </div>
    </div>
  </div>
)

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number
}

export default MovieInfoBar;
