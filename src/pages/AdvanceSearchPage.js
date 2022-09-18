import Nav from "../components/navbar/Nav";
import Loader from "../components/Loader";
import React, {useState} from "react";
import {BACKEND_ADVANCE_SEARCH} from "../config/config";
import {GetApi} from "../api/MediaContentClient";
import Footer from "../compounds/FooterCompound";
import SearchBar from "../components/AdvanceSearch/SearchBar";
import SearchResults from "../components/Search/SearchResults";

function AdvanceSearchPage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState([]);

    const searchItems = async (searchTerm, searchType) => {
        searchTerm = searchTerm.trim();
        // console.log(searchTerm);
        setLoading(true);
        let exception = false;
        let x = document.getElementById("searchHeader");
        let y = document.getElementById("rmdbSearchbar");
        if (searchTerm !== "") {
            let uri = `${BACKEND_ADVANCE_SEARCH}?query=${searchTerm}&type=${searchType}`;
            let request = await GetApi(uri).catch((error) => {
                setLoading(false);
                exception = true;
            });
            if (!exception) {
                setMovies(request.data.results);
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

    return (
        <>
            <Nav showSearchIcon={false} dynamicClass={"single-page-nav"} setLoading={setLoading}/>
            <Loader loading={loading}/>
            <SearchBar callback={searchItems} />
            {showSearch && <SearchResults dynamicClass={"rmdb-moviethumb"} movies={movies}/>}
            {/*<Banner setLoading={setLoading}/>*/}
            <Footer/>

        </>
    );
}

export default AdvanceSearchPage;
