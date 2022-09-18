import FourColGrid from "../MoviePage/element/FourColGrid/FourColGrid.component";
import React from "react";
import SearchedMovies from "./SearchedMovies";

function SearchResults({movies, dynamicClass}) {
    return (
        <div>
            <div style={{ margin: "0px 20px" }} className="rmdb-movie-grid">
                <FourColGrid header={movies.length !== 0 ? 'Searched Results' : "No Record Found"} dynamicClass={"background-grid"} headerClass={"search-header"}>
                    {movies.map( (movie, i) => (
                        <SearchedMovies dynamicClass={dynamicClass} key={i} movie={movie} />
                    ))}
                </FourColGrid>
            </div>
        </div>
    );
}

export default SearchResults;
