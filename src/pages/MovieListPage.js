import Nav from "../components/navbar/Nav";
import React, {useEffect, useState} from "react";
import Loader from "../components/Loader";
import SearchBar from "../components/AdvanceSearch/SearchBar";
import Footer from "../compounds/FooterCompound";
import SearchResults from "../components/Search/SearchResults";
import {GetApi, HomeApiGet} from "../api/MediaContentClient";
import {DeleteToken} from "../auth/Authentication";
import {BACKDROP_SIZE, BACKEND_WATCHED_CONTENT, IMAGE_BASE_URL} from "../config/config";
import FeatureContent from "../components/banner/FeatureContent";
import searchBar from "../components/AdvanceSearch/SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-regular-svg-icons";

function MovieListPage() {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [featureMovie, setFeatureMovie] = useState(false);

    useEffect(() => {
        setLoading(true);
        let endpoint = `${BACKEND_WATCHED_CONTENT}`;
        GetApi(endpoint).then((response) => {
            setContent(response.data);
            setFeatureMovie(response.data[0]);
            setLoading(false);

        }).catch((error) => {
            if (error.response.status === 401) {
                DeleteToken();
                window.location.reload();
            }
        })
    }, []);
    const searchItems = async (searchTerm, searchType) => {
    }
    return (
        <div>
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"}/>
            {featureMovie &&
                <div>
                    <FeatureContent
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${featureMovie?.backdrop_path}`}
                        title={featureMovie?.original_title}
                        text={featureMovie?.overview}
                    />

                </div>}
            <Loader loading={loading}/>
            <SearchBar showSearchHeader={false} dynamicClass={"outside-search first-filter"} callback={searchItems}/>

            <div id={"rmdbSearchbar"} className={`rmdb-searchbar outside-search second-filter`}>

                {/*<h2>Watched Movies</h2>*/}
                {/*<div className="rmdb-searchbar-content">*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    className="rmdb-searchbar-input"*/}
                    {/*    placeholder="Search"*/}
                    {/*    // onChange={inputChanged}*/}
                    {/*/>*/}
                    <select defaultValue={"0"} className={"search-select filter-select"}>
                        <option value="0">Sort By</option>
                        <option value="movie">Watched Date</option>
                        <option value="tv">Release</option>
                    </select>

                <select defaultValue={"0"} className={"search-select filter-select second-filter-content"}>
                    <option value="0">Sort Type</option>
                    <option value="movie">Watched Date</option>
                    <option value="tv">Release</option>
                </select>

                <button className="banner-button positive-button search-button"><FontAwesomeIcon
                    icon={faSearch}/> {"\u00a0\u00a0"}
                    Search
                </button>

                {/*</div>*/}
            </div>
            {!loading &&
                <SearchResults heading={"Watched Movies"} headerClass={"list-header"} dynamicClass={"rmdb-moviethumb"} movies={content}/>
            }
            <Footer/>


        </div>
    );
}

export default MovieListPage;
