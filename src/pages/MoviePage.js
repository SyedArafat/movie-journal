import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {API_KEY, API_URL} from "../config/config";
import axios from "../axios";
import MovieInfo from "../components/MoviePage/MovieInfo.component";
import MovieInfoBar from "../components/MoviePage/MovieInfoBar.component";
import Nav from "../components/navbar/Nav";
import FourColGrid from "../components/MoviePage/element/FourColGrid/FourColGrid.component";
import Actor from "../components/MoviePage/element/Actor/Actor.component";
import Spinner from "../components/Spinner/Spinner.component";
import Footer from "../compounds/FooterCompound";

function MoviePage() {
    const [movie, setMovie] = useState(false);
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState([]);
    const {movieId} = useParams();
    const {type} = useParams();


    useEffect(() => {
        async function fetchData() {
            let endpoint = `${API_URL}${type}/${movieId}?api_key=${API_KEY}&language=en-US`;
            const request = await axios.get(endpoint);
            setMovie(request.data);
            let creditEndpoint = `${API_URL}${type}/${movieId}/credits?api_key=${API_KEY}`;
            const creditRequest = await axios.get(creditEndpoint);
            setCredits(creditRequest.data);

        }

        fetchData();
    }, [movieId, type]);

    let directors = [];
    let actors = false;

    if (credits.crew !== undefined) {
        directors = credits.crew.filter((member) => member.job === "Director");
    }

    if (credits.crew !== undefined) {
        actors = credits.cast.slice(0,4);
    }

    return (
        <div className="rmdb-movie">
            {movie ?
                <div>
                    <Nav dynamicClass={"single-page-nav"}/>
                    <MovieInfo movie={movie} type={type} directors={directors}/>

                    <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
                </div>
                : null}
            {actors ?
                <div style={{ margin: "0px 20px" }} className="rmdb-movie-grid">
                    <FourColGrid header={'Actors'}>
                        {actors.map( (element, i) => (
                            <Actor key={i} actor={element} />
                        ))}
                    </FourColGrid>
                </div>
                : null }
            {/*<MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>*/}
            <Footer />
            {loading ? <Spinner /> : null}
        </div>

    );
}

export default MoviePage;
