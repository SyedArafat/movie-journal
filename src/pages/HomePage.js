import Nav from "../components/navbar/Nav";
import Banner from "../components/banner/Banner";
import Row from "../components/row/Row";
import requests from "../config/requests";
import Footer from "../compounds/FooterCompound";
import {API_KEY, API_URL, SEARCH_TYPE} from "../config/config";
import React, {useState} from "react";
import axios from "../axios";
import SearchResults from "../components/Search/SearchResults";
import Loader from "../components/Loader";
import {Authed} from "../auth/Authentication";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState(false);


    const searchItems = async (searchTerm) => {
        setLoading(true);
        let endpoint = '';

        if (searchTerm !== "" && searchTerm.length > 2) {
            endpoint = `${API_URL}search/${SEARCH_TYPE}?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
            let request = await axios.get(endpoint);
            setMovies(request.data.results);
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
        setLoading(false);
    }
    return (
        <div className="App">
            <Nav callback={searchItems} setLoading={setLoading}/>
            <Loader loading={loading}/>
            {showSearch === false ?
                <div>
                    <Banner setLoading={setLoading}/>
                    {
                        (!Authed()) ?
                            <>
                                <Row setLoading={setLoading} isLargeRow={true} title="Trending Now"
                                     fetchUrl={requests.fetchTrending}/>
                                <Row setLoading={setLoading} isLargeRow={true} title="NETFLIX ORIGINALS"
                                     fetchUrl={requests.fetchNetflixOriginals}/>
                                <Row setLoading={setLoading} isLargeRow={true} title="Top Rated"
                                     fetchUrl={requests.fetchTopRated}/>
                            </> :
                            <>
                                <Row setLoading={setLoading} isLargeRow={true} title="Recent Watched"
                                     fetchUrl={requests.recentWatched}/>
                                <Row setLoading={setLoading} isLargeRow={true} title="Trending Now"
                                     fetchUrl={requests.fetchTrending}/>
                                <Row setLoading={setLoading} isLargeRow={true} title="Recent Movies"
                                     fetchUrl={requests.recentWatchedMovies}/>
                                <Row setLoading={setLoading} isLargeRow={true} title="Recent TV"
                                     fetchUrl={requests.recentWatchedTV}/>
                            </>
                    }
                </div>
                : <SearchResults movies={movies}/>
            }
            <Footer/>
            {/* <Row title = "Action Movies" fetchUrl = {requests.fetchActionMovies} /> */}
            {/* <Row title = "Comedy Movies" fetchUrl = {requests.fetchComedyMovies} /> */}
            {/* <Row title = "Romance Movies" fetchUrl = {requests.fetchRomanceMovies} /> */}
            {/* <Row title = "Documentaries" fetchUrl = {requests.fetchDocumentaries} /> */}
            {/* <Row title = "Horror Movies" fetchUrl = {requests.fetchHorrorMovies} /> */}
        </div>
    );
}

export default HomePage;
