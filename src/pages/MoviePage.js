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
import Seasons from "../components/TV/Seasons";
import SearchResults from "../components/Search/SearchResults";

function MoviePage() {
    const [movie, setMovie] = useState(false);
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState([]);
    const {movieId} = useParams();
    const {type} = useParams();

    const [movies, setMovies] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchItems = async (searchTerm) => {
        let endpoint = '';

        if (searchTerm !== "" && searchTerm.length > 2) {
            endpoint = `${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
            let request = await axios.get(endpoint);
            setMovies(request.data.results);
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    }


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

    // console.log(movie.number_of_seasons);

    return (
        <div className="rmdb-movie">
            <Nav callback={searchItems} dynamicClass={"single-page-nav"}/>
            {
                showSearch === false ? (
                movie ?
                <div>
                    <MovieInfo movie={movie} type={type} directors={directors}/>

                    <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>


                </div>
                : null) :
                    <SearchResults movies={movies} />
            }
            {actors && showSearch === false ?
                <div style={{ margin: "0px 20px" }} className="rmdb-movie-grid">
                    <FourColGrid header={'Actors'}>
                        {actors.map( (element, i) => (
                            <Actor key={i} actor={element} />
                        ))}
                    </FourColGrid>
                </div>
                : null }
            {type === "tv" && showSearch === false ?
                <Seasons id={movieId} name = {movie?.title || movie?.name || movie?.original_name}  numberOfSeasons={movie.number_of_seasons}/>
                : null
            }

            <Footer />
            {loading ? <Spinner /> : null}
        </div>

    );
}

export default MoviePage;
