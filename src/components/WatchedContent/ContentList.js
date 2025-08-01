import SearchBar from "../AdvanceSearch/SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import SearchResults from "../Search/SearchResults";
import LoadMoreBtn from "../AdvanceSearch/LoadMoreBtn";
import React, {useState} from "react";

function ContentList() {
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <>
            <SearchBar showSearchHeader={false} dynamicClass={"outside-search first-filter"} callback={searchItems}/>

            <div id={"rmdbSearchbar"} className={`rmdb-searchbar outside-search second-filter`}>
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
            {(currentPage < totalPages && !loading) ?
                <LoadMoreBtn text="Load More" onClick={nextPageLoad} />
                : null
            }
        </>
    );
}

export default ContentList;
