import "./AdvanceSearchStyle.css";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function SearchBar({callback}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("multi");

    const [timer, setTimer] = useState(null)

    const inputChanged = e => {
        setSearchQuery(e.target.value)

        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            callback(e.target.value, searchType);
        }, 900)

        setTimer(newTimer)
    }

    const setType = (event) => {
        setSearchType(event.target.value);
        callback(searchQuery, event.target.value);
    }

    return (
        <>
            <div id={"rmdbSearchbar"} className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesomeIcon className={"rmdb-fa-search"} icon={faSearch} size={"2x"} />
                    <input
                        type="text"
                        className="rmdb-searchbar-input"
                        placeholder="Search"
                        onChange={inputChanged}
                    />
                    <select defaultValue={"multi"} onChange={setType} className={"search-select"}>
                        <option value="multi">All</option>
                        <option value="movie">Movies</option>
                        <option value="tv">Tv Shows</option>
                    </select>
                </div>
                <div>
                    <h2 id={"searchHeader"} className={"search-tag-line"}>
                        Search What You Desire
                    </h2>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
