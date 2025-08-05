import React, {useEffect, useState} from "react";
import {
    BACKDROP_SIZE,
    BACKEND_WISHLIST_CONTENT,
    IMAGE_BASE_URL
} from "../config/config";
import {GetApi} from "../api/MediaContentClient";
import {DeleteToken} from "../auth/Authentication";
import Nav from "../components/navbar/Nav";
import FeatureContent from "../components/banner/FeatureContent";
import {contentTitle} from "../helpers";
import Loader from "../components/Loader";
import SearchBar from "../components/AdvanceSearch/SearchBar";
import SearchResults from "../components/Search/SearchResults";
import LoadMoreBtn from "../components/AdvanceSearch/LoadMoreBtn";
import Footer from "../compounds/FooterCompound";
import Alert from "../components/Alert/Alert";
import {useNavigate} from "react-router-dom";

function WishListPage() {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [featureMovie, setFeatureMovie] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contentType, setContentType] = useState('multi');
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setLoading(true);
        let endpoint = `${BACKEND_WISHLIST_CONTENT}`;
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
            setLoading(false);
            if (error.response.status === 401) {
                DeleteToken();
                navigate("/signin");
            } else {
                setAlert({
                    type: "error",
                    message: "Oops! Something went wrong. Please try again."
                });
            }
        })
    }

    const setSearchItems = (searchTerm, searchType) => {
        setLoading(true);
        searchTerm = searchTerm.trim();
        setSearchQuery(searchTerm);
        setContentType(searchType);
        let uri = `${BACKEND_WISHLIST_CONTENT}?query=${searchTerm}&content_type=${searchType}`;
        manageCall(uri);
    }

    const nextPageLoad = async () => {
        setLoading(true);
        let exception = false;

        let uri = `${BACKEND_WISHLIST_CONTENT}?query=${searchQuery}&content_type=${contentType}&page=${currentPage + 1}`;
        let request = await GetApi(uri).catch((error) => {
            setLoading(false);
            exception = true;
            if (error.response.status === 401) {
                DeleteToken();
                navigate("/signin");
            } else {
                setAlert({
                    type: "error",
                    message: "Oops! Something went wrong. Please try again."
                });
            }
        });
        if (!exception) {
            let allContents = ([...content, ...request.data.results]);
            setContent(allContents);
            setCurrentPage(request.data.page);
            setTotalPages(request.data.total_pages);
        }

        setLoading(false);

    }

    return (
        <div>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
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

            {
                !loading && content.length === 0 ?
                    <div className="empty-state">
                        <h2>Empty List</h2>
                        <p>You haven't added any movies in wishlist.</p>
                        <img src={"images/svg/undraw_video-files_cxl9.svg"} alt="No Data" className="empty-image"/>
                    </div> :
                    <SearchResults heading={"Wished List"} headerClass={"list-header"} dynamicClass={"rmdb-moviethumb"}
                                   movies={content}/>
            }


            {(currentPage < totalPages && !loading) ?
                <LoadMoreBtn text="Load More" onClick={nextPageLoad}/>
                : null
            }
            <Footer/>


        </div>
    );
}

export default WishListPage;
