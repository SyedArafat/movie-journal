import Nav from "../components/navbar/Nav";
import Banner from "../components/banner/Banner";
import Row from "../components/row/Row";
import requests from "../config/requests";
import Footer from "../compounds/FooterCompound";
import {BACKEND_EXTERNAL_SEARCH, BACKEND_HOME_API_AUTH, BACKEND_HOME_API_NON_AUTH} from "../config/config";
import React, {useEffect, useState} from "react";
import SearchResults from "../components/Search/SearchResults";
import Loader from "../components/Loader";
import {Authed} from "../auth/Authentication";
import {GetApi} from "../api/MediaContentClient";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState([]);
    const [homeData, setHomeData] = useState([]);

    useEffect(() => {
        const url = Authed() ? BACKEND_HOME_API_AUTH : BACKEND_HOME_API_NON_AUTH;
        async function fetchData() {
            try {
                setLoading(true);
                const response = await GetApi(url);
                setHomeData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData().then(r => {});
    }, []);


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
            if(!exception) {
                setMovies(request.data.results);
                setShowSearch(true);
            }
        } else {
            setShowSearch(false);
        }
        setLoading(false);
    }

    return (
        <div className="App">
            <Nav callback={searchItems} setLoading={setLoading}/>
            <Loader loading={loading}/>
            {showSearch === false && homeData ?
                <div>
                    <Banner setLoading={setLoading} movie={homeData.banner}/>

                    {
                        (!Authed()) ?
                            <>
                                {homeData.trending && <Row setLoading={setLoading} isLargeRow={true} title="Trending Now"
                                     fetchUrl={requests.fetchTrending} movies={homeData.trending}/>}
                                {homeData.netflixoriginals && <Row setLoading={setLoading} isLargeRow={true} title="NETFLIX ORIGINALS"
                                     fetchUrl={requests.fetchNetflixOriginals} movies={homeData.netflixoriginals}/>}
                                {homeData.toprated && <Row setLoading={setLoading} isLargeRow={true} title="Top Rated"
                                     fetchUrl={requests.fetchTopRated} movies={homeData.toprated}/>}
                            </> :
                            <>
                                {homeData.recentwatchedmovie && <Row setLoading={setLoading} isLargeRow={true} title="Watched Movies"
                                     fetchUrl={requests.recentWatchedMovies} movies={homeData.recentwatchedmovie}/>}
                                {homeData.recentwatchedtv && <Row setLoading={setLoading} isLargeRow={true} title="Watched TV"
                                     fetchUrl={requests.recentWatchedTV} movies={homeData.recentwatchedtv}/>}
                                {homeData.trending && <Row setLoading={setLoading} isLargeRow={true} title="Trending Now"
                                     fetchUrl={requests.fetchTrending} movies={homeData.trending}/>}
                            </>
                    }
                </div>
                : <SearchResults dynamicClass={"rmdb-moviethumb"} movies={movies}/>
            }
            <Footer/>

        </div>
    );
}

export default HomePage;
