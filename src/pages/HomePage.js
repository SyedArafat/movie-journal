import Nav from "../components/navbar/Nav";
import Banner from "../components/banner/Banner";
import Row from "../components/row/Row";
import requests from "../config/requests";
import Footer from "../compounds/FooterCompound";
import {BACKEND_EXTERNAL_SEARCH} from "../config/config";
import React, {useState} from "react";
import SearchResults from "../components/Search/SearchResults";
import Loader from "../components/Loader";
import {Authed} from "../auth/Authentication";
import {GetApi} from "../api/MediaContentClient";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState([]);


    const searchItems = async (searchTerm) => {
        setLoading(true);

        if (searchTerm !== "" && searchTerm.length > 2) {
            let uri = `${BACKEND_EXTERNAL_SEARCH}?query=${searchTerm}`;
            let request = await GetApi(uri);
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

        </div>
    );
}

export default HomePage;
