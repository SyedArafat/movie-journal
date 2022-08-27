import {Rating} from "react-simple-star-rating";
import React, {useState} from "react";

function MovieRating({dynamicClass, toolTip = true, setRating}) {
    const [rating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <div className={`modal-rating  ${dynamicClass}`}>
            <Rating onClick={handleRating} allowHalfIcon={true} size={34} transition={false} showTooltip={toolTip}
                    ratingValue={rating}/>
        </div>
    );
}

export default MovieRating;
