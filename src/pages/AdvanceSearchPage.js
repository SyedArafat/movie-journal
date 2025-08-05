import Nav from "../components/navbar/Nav";
import Loader from "../components/Loader";
import React, {useState} from "react";
import {BACKEND_ADVANCE_SEARCH} from "../config/config";
import {GetApi} from "../api/MediaContentClient";
import Footer from "../compounds/FooterCompound";
import SearchBar from "../components/AdvanceSearch/SearchBar";
import SearchResults from "../components/Search/SearchResults";
import LoadMoreBtn from "../components/AdvanceSearch/LoadMoreBtn";
import {DeleteToken} from "../auth/Authentication";
import {useNavigate} from "react-router-dom";
import Alert from "../components/Alert/Alert";

function AdvanceSearchPage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contentType, setContentType] = useState('multi');
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const searchItems = async (searchTerm, searchType) => {
        searchTerm = searchTerm.trim();
        setSearchQuery(searchTerm);
        setContentType(searchType);
        setLoading(true);
        let exception = false;
        let x = document.getElementById("searchHeader");
        let y = document.getElementById("rmdbSearchbar");
        if (searchTerm !== "") {
            let uri = `${BACKEND_ADVANCE_SEARCH}?query=${searchTerm}&type=${searchType}`;
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
                setMovies(request.data.results);
                setCurrentPage(request.data.page);
                setTotalPages(request.data.total_pages);
                setShowSearch(true);
                x.style.display = "none";
                y.style.height = "11em";
            }
        } else {
            setShowSearch(false);
            x.style.display = "block";
            y.style.height = "18em";
        }
        setLoading(false);
    }

    const nextPageLoad = async () => {
        setLoading(true);
        let exception = false;

        if (searchQuery !== "") {
            let uri = `${BACKEND_ADVANCE_SEARCH}?query=${searchQuery}&type=${contentType}&page=${currentPage + 1}`;
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
                let allMovies = ([...movies, ...request.data.results]);
                setMovies(allMovies);
                setCurrentPage(request.data.page);
                setTotalPages(request.data.total_pages);
                setShowSearch(true);
            }
        } else {
            setShowSearch(false);
        }
        setLoading(false);

    }

    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"} setLoading={setLoading}/>
            <Loader loading={loading}/>
            <SearchBar callback={searchItems} />
            {showSearch && movies.length === 0 &&
            <div className="empty-state">
                <h2>Empty List</h2>
                <p>You haven't added any movies in wishlist.</p>
                <img src={"images/svg/undraw_video-files_cxl9.svg"} alt="No Data" className="empty-image"/>
            </div> }
            {showSearch && <SearchResults dynamicClass={"rmdb-moviethumb"} movies={movies}/>}
            {(currentPage < totalPages && !loading && showSearch) ?
                <LoadMoreBtn text="Load More" onClick={nextPageLoad} />
                : null
            }
            {/*<Banner setLoading={setLoading}/>*/}
            <Footer/>

        </>
    );
}

export default AdvanceSearchPage;
