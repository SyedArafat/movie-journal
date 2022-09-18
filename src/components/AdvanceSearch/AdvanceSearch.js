import "./AdvanceSearchStyle.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function AdvanceSearch() {
    return (
        <>
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesomeIcon className={"rmdb-fa-search"} icon={faSearch} size={"2x"} />
                    <input
                        type="text"
                        className="rmdb-searchbar-input"
                        placeholder="Search"
                        // onChange={this.doSearch}
                        // value={value}
                    />
                    <select className={"search-select"}>
                        <option selected value="0">All</option>
                        <option value="1">Movies</option>
                        <option value="2">Tv Shows</option>
                    </select>
                </div>
                <div>
                    <h2 className={"search-tag-line"}>
                        Search What You Desire
                    </h2>
                </div>
            </div>
        </>
    );
}

export default AdvanceSearch;
