import {Rating} from "react-simple-star-rating";
import React, {useState} from "react";

function MovieRating() {
    const [rating, setRating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }

    return (
        <div className={"modal-rating"}>
            <Rating onClick={handleRating} allowHalfIcon={true} size={34} transition={true} showTooltip={true}
                    ratingValue={rating}/>
        </div>
    );
}

export default MovieRating;
