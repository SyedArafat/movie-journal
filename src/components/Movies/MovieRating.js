import {Rating} from "react-simple-star-rating";
import React from "react";

function MovieRating({dynamicClass, toolTip = true, setRating, storedRating= 0, isWatched}) {
    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <div className={`modal-rating  ${dynamicClass}`}>
            <Rating allowHover={!isWatched} onClick={handleRating} allowHalfIcon={true} size={34} transition={false} showTooltip={toolTip}
                    ratingValue={storedRating}/>
        </div>
    );
}

export default MovieRating;
