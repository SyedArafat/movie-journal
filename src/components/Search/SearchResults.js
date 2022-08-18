import FourColGrid from "../MoviePage/element/FourColGrid/FourColGrid.component";
import React from "react";
import SearchedMovies from "./SearchedMovies";

function SearchResults({movies}) {
    return (
        <div>
            <div style={{ margin: "0px 20px" }} className="rmdb-movie-grid">
                <FourColGrid header={'Searched Results'} dynamicClass={"background-grid"} headerClass={"search-header"}>
                    {movies.map( (movie, i) => (
                        <SearchedMovies key={i} movie={movie} />
                    ))}
                </FourColGrid>
            </div>
        </div>
    );
}

export default SearchResults;
