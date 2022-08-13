import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {API_KEY, API_URL} from "../config/config";
import axios from "../axios";
import MovieInfo from "../components/MoviePage/MovieInfo.component";
import MovieInfoBar from "../components/MoviePage/MovieInfoBar.component";
import Nav from "../components/navbar/Nav";

function MoviePage() {
    // state = {}
    // console.log(789);
    const [movie, setMovie] = useState(false);
    const [credits, setCredits] = useState([]);
    // const [state, setState] = useState([]);
    const {movieId} = useParams();
    const {type} = useParams();


    useEffect(() => {
        async function fetchData() {
            // if(!movie) {
                let endpoint = `${API_URL}${type}/${movieId}?api_key=${API_KEY}&language=en-US`;
                const request = await axios.get(endpoint);
                setMovie(request.data);
                let creditEndpoint = `${API_URL}${type}/${movieId}/credits?api_key=${API_KEY}`;
                const creditRequest = await axios.get(creditEndpoint);
                setCredits(creditRequest.data);


                // return request;
            // }

        }

        fetchData();
    }, [movieId]);

    var directors = [];

    if(credits.crew !== undefined) {
         directors = credits.crew.filter( (member) => member.job === "Director");
    }

    // console.log(movie);
    return (

        <div className="rmdb-movie">
            {movie ?
                <div>
                    <Nav dynamicClass={"single-page-nav"} />
                    <MovieInfo movie={movie} directors={directors} />
                    <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
                </div>
                : null }
            {/*{actors ?*/}
            {/*    <div className="rmdb-movie-grid">*/}
            {/*        <FourColGrid header={'Actors'}>*/}
            {/*            {actors.map( (element, i) => (*/}
            {/*                <Actor key={i} actor={element} />*/}
            {/*            ))}*/}
            {/*        </FourColGrid>*/}
            {/*    </div>*/}
            {/*    : null }*/}
            {/*{!actors && !loading ? <h1>No movie found</h1> : null }*/}
            {/*{loading ? <Spinner /> : null}*/}
        </div>

    );
}

export default MoviePage;
