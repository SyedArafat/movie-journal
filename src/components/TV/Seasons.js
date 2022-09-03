import FourColGrid from "../MoviePage/element/FourColGrid/FourColGrid.component";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import "./EpisodeStyle.css";
import {BACKEND_MEDIA_CONTENT_API, BACKEND_SEASON_DETAILS_API} from "../../config/config";
import Episode from "./Episode";
import MovieRating from "../Movies/MovieRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import api from "../../api/BackendApi";
import {GetToken} from "../../auth/Authentication";
import {GetApi} from "../../api/MediaContentClient";

function Seasons({id, name, numberOfSeasons, seasonDetails}) {
    const [rating, setRating] = useState(0);
    const [seasonWatched, setSeasonWatched] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [episodes, setEpisodes] = useState(false);
    const [seasonNumber, setSeasonNumber] = useState(1);
    useEffect(() => {
        async function fetchData() {
            let endpoint = `${BACKEND_SEASON_DETAILS_API}/${id}/1`;
            const request = await GetApi(endpoint).catch((error) => {
                setLoading(false);
            });
            setEpisodes(request.data.episodes);
        }

        async function getSeasonsStatus() {
            if (seasonDetails !== undefined && seasonDetails) {
                seasonDetails.forEach((season) => {
                    if (season.season_number === 1 && season.status === "watched") {
                        setSeasonWatched(true);
                        setRating(season.rating);
                    }
                })
            } else {
                setSeasonWatched(false);
                setRating(0);
            }
        }

        fetchData().then();
        getSeasonsStatus().then();
    }, [id, seasonDetails]);
    const handleChange = async (selectOption) => {
        setRating(0);
        setSeasonWatched(false);
        setLoading(true);
        let seasonNo = (selectOption.target.value);
        let endpoint = `${BACKEND_SEASON_DETAILS_API}/${id}/${seasonNo}`;
        const request = await GetApi(endpoint).catch((error) => {
            setLoading(false);
        });
        setEpisodes(request.data.episodes);
        seasonNo = parseInt(seasonNo);
        setSeasonNumber(seasonNo);
        if (seasonDetails !== undefined && seasonDetails) {
            seasonDetails.forEach((season) => {
                if (season.season_number === seasonNo && season.status === "watched") {
                    setSeasonWatched(true);
                    setRating(season.rating);
                }
            })
        }
        setLoading(false);
    }
    const handleSeasonWatched = async () => {
        if (!rating) {
            alert("Rating is missing");
            return false;
        }
        setLoading(true);

        let data = {
            "content": JSON.stringify({"id": id}),
            "type": "tv",
            "store_type": "watched",
            "rating": rating,
            "season_no": seasonNumber
        }
        try {
            await api.post(`${BACKEND_MEDIA_CONTENT_API}`, data, {
                "headers": {
                    "Authorization": `Bearer ${GetToken()}`
                }
            });
            setSuccess(true);
            setError("");
        } catch (err) {
            setSuccess(false);
            if(!err?.response) {
                setError("No Server Response");
            } else if(err.response?.status === 400) {
                setError("Invalid Input Data");
            } else {
                setError("Something Went Wrong! Try again Later");
            }
        }

        setLoading(false);
        window.location.reload();

    }
    let seasonsDropDown = []
    for (let i = 1; i <= numberOfSeasons; i++) {
        seasonsDropDown.push(<option key={i} value={i}>Season {i}</option>);
    }


    return (
        <div>
            {episodes ?
                <div style={{margin: "0px 20px"}} className="rmdb-movie-grid">
                    <h2>Episodes | <span className={"section-subheader-text"}>{name}</span>
                        {seasonWatched && <span className="watch-badge">Watched</span>}
                    </h2>
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
                            <MovieRating setRating={setRating} storedRating={rating}
                                         dynamicClass="watch-button-in-page"/>
                            {/*<span><img style={{paddingTop: "7px", marginLeft: "14px"}} width={"45px"} src={"/images/icons/tick2.png"} /></span>*/}
                            {!seasonWatched && <button onClick={handleSeasonWatched} className="banner-button watch-button">
                                <FontAwesomeIcon
                                    icon={faPlayCircle}/> {"\u00a0\u00a0"}
                                Watched
                            </button>}
                            {seasonWatched && <button onClick={handleSeasonWatched} className="banner-button watch-button update-button"><FontAwesomeIcon icon={faPlayCircle}/> {"\u00a0\u00a0"}
                                Update
                            </button>}
                        </div>
                    </div>
                    <Loader loading={loading}/>

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
