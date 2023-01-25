import Nav from "../components/navbar/Nav";
import React, {useEffect, useState} from "react";
import Loader from "../components/Loader";
import SearchBar from "../components/AdvanceSearch/SearchBar";
import Footer from "../compounds/FooterCompound";
import SearchResults from "../components/Search/SearchResults";
import {GetApi} from "../api/MediaContentClient";
import {DeleteToken} from "../auth/Authentication";
import {BACKDROP_SIZE, BACKEND_WATCHED_CONTENT, IMAGE_BASE_URL} from "../config/config";
import FeatureContent from "../components/banner/FeatureContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import LoadMoreBtn from "../components/AdvanceSearch/LoadMoreBtn";
import {contentTitle} from "../helpers";

function WatchedContentListPage() {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [featureMovie, setFeatureMovie] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contentType, setContentType] = useState('multi');
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("");


    useEffect(() => {
        setLoading(true);
        let endpoint = `${BACKEND_WATCHED_CONTENT}`;
        manageCall(endpoint);
    }, []);

    const manageCall = (endpoint) => {
        GetApi(endpoint).then((response) => {
            setContent(response.data.results);
            setFeatureMovie(response.data.results[0]);
            setCurrentPage(response.data.page);
            setTotalPages(response.data.total_pages);
            setLoading(false);

        }).catch((error) => {
            if (error.response.status === 401) {
                DeleteToken();
                window.location.reload();
            }
        })
    }

    const setSearchItems = (searchTerm, searchType) => {
        searchTerm = searchTerm.trim();
        setSearchQuery(searchTerm);
        setContentType(searchType);
    }

    const executeSearch = async () => {
        setLoading(true);
        let uri = `${BACKEND_WATCHED_CONTENT}?query=${searchQuery}&content_type=${contentType}&order_by=${sortBy}&order_type=${sortType}&page=1`;
        manageCall(uri);
        // setLoading(false);
    }

    const nextPageLoad = async () => {
        setLoading(true);
        let exception = false;

        // if (searchQuery !== "") {
        let uri = `${BACKEND_WATCHED_CONTENT}?query=${searchQuery}&content_type=${contentType}&order_by=${sortBy}&order_type=${sortType}&page=${currentPage + 1}`;
        let request = await GetApi(uri).catch((error) => {
            setLoading(false);
            exception = true;
        });
        if (!exception) {
            let allContents = ([...content, ...request.data.results]);
            setContent(allContents);
            setCurrentPage(request.data.page);
            setTotalPages(request.data.total_pages);
            // setShowSearch(true);
        }

        setLoading(false);

    }

    return (
        <div>
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"}/>
            {featureMovie &&
                <div>
                    <FeatureContent
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${featureMovie?.backdrop_path}`}
                        title={contentTitle(featureMovie)}
                    />

                </div>}
            <Loader loading={loading}/>
            <SearchBar showSearchHeader={false} dynamicClass={"outside-search first-filter"} callback={setSearchItems}/>

            <div id={"rmdbSearchbar"} className={`rmdb-searchbar outside-search second-filter`}>

                <select defaultValue={""} onChange={(e) => {
                    setSortBy(e.target.value)
                }} className={"search-select filter-select"}>
                    <option value="">Sort By</option>
                    <option value="rating">Own Rating</option>
                    <option value="watched_time">Watched Date</option>
                    <option value="created_at">Stored Time</option>
                </select>

                <select defaultValue={""} onChange={(e) => {
                    setSortType(e.target.value)
                }} className={"search-select filter-select second-filter-content"}>
                    <option value="desc">Sort Type</option>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>

                <button onClick={executeSearch} className="banner-button positive-button search-button"><FontAwesomeIcon
                    icon={faSearch}/> {"\u00a0\u00a0"}
                    Search
                </button>

            </div>

            <SearchResults heading={"Recent Watched"} headerClass={"list-header"} dynamicClass={"rmdb-moviethumb"}
                           movies={content}/>

            {(currentPage < totalPages && !loading) ?
                <LoadMoreBtn text="Load More" onClick={nextPageLoad}/>
                : null
            }
            <Footer/>


        </div>
    );
}

export default WatchedContentListPage;
