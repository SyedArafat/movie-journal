import FourColGrid from "../MoviePage/element/FourColGrid/FourColGrid.component";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import "./EpisodeStyle.css";
import {API_KEY, API_URL} from "../../config/config";
import axios from "../../axios";
import Episode from "./Episode";
import MovieRating from "../Movies/MovieRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import BadgeWatch from "../Movies/BadgeWatch";

function Seasons({id, name, numberOfSeasons}) {
    const [episodes, setEpisodes] = useState(false);
    useEffect(() => {
        async function fetchData() {
            let endpoint = `${API_URL}tv/${id}/season/1?api_key=${API_KEY}&language=en-US`;
            const request = await axios.get(endpoint);
            setEpisodes(request.data.episodes);
        }

        fetchData().then();
    }, [id]);
    const handleChange = async (selectOption) => {
        let seasonNo = (selectOption.target.value);
        let endpoint = `${API_URL}tv/${id}/season/${seasonNo}?api_key=${API_KEY}&language=en-US`;
        const request = await axios.get(endpoint);
        setEpisodes(request.data.episodes);

    }
    let seasonsDropDown = []
    for (let i = 1; i <= numberOfSeasons; i++) {
        seasonsDropDown.push(<option key={i} value={i}>Season {i}</option>);
    }


    return (
        <div>
            {episodes ?
                <div style={{margin: "0px 20px"}} className="rmdb-movie-grid">
                    <h2>Episodes | <span className={"section-subheader-text"}>{name}</span></h2>
                    <div className={"season-option-section"}>
                        <div style={{
                            float: "left"
                        }}>
                            <Form.Select
                                onChange={handleChange}
                                aria-label="Season 1">
                                {
                                    seasonsDropDown
                                }
                            </Form.Select>

                        </div>
                        <div style={{
                            float: "right"
                        }}>
                            <MovieRating dynamicClass="watch-button-in-page"/>
                            {/*<span><img style={{paddingTop: "7px", marginLeft: "14px"}} width={"45px"} src={"/images/icons/tick2.png"} /></span>*/}
                            <button className="banner-button watch-button"><FontAwesomeIcon
                                icon={faPlayCircle}/> {"\u00a0\u00a0"}
                                Watched
                            </button>
                        </div>
                    </div>
                    <FourColGrid>
                        {episodes.map((element, i) => (
                            <Episode key={i} episode={element}/>
                        ))}
                    </FourColGrid>
                </div>
                : null}

        </div>
    );
}

export default Seasons;
