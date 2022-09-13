import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    BACKEND_EXTERNAL_SEARCH,
    BACKEND_MEDIA_CONTENT_API
} from "../config/config";
import MovieInfo from "../components/MoviePage/MovieInfo.component";
import MovieInfoBar from "../components/MoviePage/MovieInfoBar.component";
import Nav from "../components/navbar/Nav";
import FourColGrid from "../components/MoviePage/element/FourColGrid/FourColGrid.component";
import Actor from "../components/MoviePage/element/Actor/Actor.component";
import Footer from "../compounds/FooterCompound";
import Seasons from "../components/TV/Seasons";
import SearchResults from "../components/Search/SearchResults";
import Loader from "../components/Loader";
import {GetApi} from "../api/MediaContentClient";
import {DeleteToken} from "../auth/Authentication";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faDollyBox, faRankingStar, faReceipt} from "@fortawesome/free-solid-svg-icons";

function MoviePage() {
    const [movie, setMovie] = useState(false);
    const [seasonDetails, setSeasonDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState([]);
    const {movieId} = useParams();
    const {type} = useParams();
    const navigte = useNavigate();
    const [comment, setComment] = useState("");

    const [movies, setMovies] = useState(false);
    const [personalChoice, setPersonalChoice] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchItems = async (searchTerm) => {
        searchTerm = searchTerm.trim();
        setLoading(true);
        let exception = false;
        if (searchTerm !== "" && searchTerm.length > 2) {
            let uri = `${BACKEND_EXTERNAL_SEARCH}?query=${searchTerm}`;
            let request = await GetApi(uri).catch((error) => {
                setLoading(false);
                exception = true;
            });
            if (!exception) {
                setMovies(request.data.results);
                setShowSearch(true);
            }
        } else {
            setShowSearch(false);
        }
        setLoading(false);
    }


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let endpoint = `${BACKEND_MEDIA_CONTENT_API}/${type}/${movieId}`;
            const response = await GetApi(endpoint).catch((error) => {
                if (error.response.status === 401) {
                    DeleteToken();
                    navigte("/signin");
                }
            });
            setMovie(response.data.content_details);
            setPersonalChoice(response.data.user_feedback);
            setSeasonDetails(personalChoice?.seasons);
            setCredits(response.data.credit_details);
            console.log(personalChoice);
            setComment(personalChoice?.review);
            setLoading(false);
        }

        fetchData().then(r => {
        });
    }, [movieId, type]);

    let directors = [];
    let actors = false;

    if (credits.crew !== undefined) {
        directors = credits.crew.filter((member) => member.job === "Director");
    }

    if (credits.crew !== undefined) {
        actors = credits.cast.slice(0, 4);
    }

    return (
        <div className="rmdb-movie">
            <Nav callback={searchItems} setLoading={setLoading} dynamicClass={"single-page-nav"}/>
            <Loader loading={loading}/>
            {
                showSearch === false ? (
                        movie ?
                            <div>
                                <MovieInfo
                                    setComment={setComment}
                                    setSeasonDetails={setSeasonDetails}
                                    setLoading={setLoading}
                                    movie={movie}
                                    type={type}
                                    directors={directors}
                                    personalChoice={personalChoice}/>

                                <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>


                            </div>
                            : null) :
                    <SearchResults movies={movies}/>
            }
            {actors && actors.length !== 0 && showSearch === false ?
                <div style={{margin: "0px 20px"}} className="rmdb-movie-grid">
                    <FourColGrid header={'Actors'}>
                        {actors.map((element, i) => (
                            <Actor key={i} actor={element}/>
                        ))}
                    </FourColGrid>
                </div>
                : null}

            <div style={{marginTop: "30px"}}>
                <div className="rmdb-movieinfobar">
                    <div className="rmdb-movieinfobar-content">
                        <div className="review-movieinfobar-content-col">
                            <FontAwesomeIcon className={"fa-time"} icon={faRankingStar} size={"2x"}/>
                            <span className="rmdb-movieinfobar-info">Review</span>

                        </div>
                        <div style={{fontFamily: "cursive"}}>{comment ?? personalChoice?.review}</div>
                    </div>
                </div>
            </div>


            {type === "tv" && showSearch === false ?
                <Seasons
                    seasonDetails={seasonDetails ?? personalChoice?.seasons}
                    id={movieId}
                    name={movie?.title || movie?.name || movie?.original_name}
                    numberOfSeasons={movie.number_of_seasons}

                />
                : null
            }

            <Footer/>
        </div>

    );
}

export default MoviePage;
