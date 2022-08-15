import FourColGrid from "../MoviePage/element/FourColGrid/FourColGrid.component";
import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import "./EpisodeStyle.css";
import {API_KEY, API_URL} from "../../config/config";
import axios from "../../axios";
import Episode from "./Episode";

function Seasons({id, numberOfSeasons}) {
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
    let seasons = []
    for (let i = 1; i <= numberOfSeasons; i++) {
        seasons.push(<option key={i} value={i}>Season {i}</option>);
    }

    // console.log(episodes);
    return (
        <div>
            {episodes ?
                <div style={{ margin: "0px 20px" }} className="rmdb-movie-grid">
                    <h2>Episodes</h2>
                    <Form.Select
                        onChange={handleChange}
                        aria-label="Season 1">
                        {
                            seasons
                        }
                    </Form.Select>
                    <FourColGrid >
                        {episodes.map( (element, i) => (
                            <Episode key={i} episode={element} />
                        ))}
                    </FourColGrid>
                </div>
                : null }

        </div>
    );
}

export default Seasons;
