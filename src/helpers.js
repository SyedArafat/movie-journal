// Convert time to hours and minutes
import {format} from "date-fns";

export const calcTime = time => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
};

// Convert a number to $ format
export const convertMoney = money => {
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
    });
    return formatter.format(money);
};

export const movieTitle = (movie) => {
    return (movie?.title || movie?.name || movie?.original_name);
}

export const contentTitle = (content) => {
    let movieName = movieTitle(content);
    let to;
    let isActor = content.media_type === "person";
    let isTV = content.media_type === "tv";
    if (isActor) return movieName + " (" + content.known_for_department + ")";
    if (isTV) {
        if (content.status === "Returning Series" || content.status === "In Production" || content.status === "Planned") {
            to = "Present";
        } else if(content.status === "Ended" || content.status === "Canceled" || content.status === "Pilot"){
            to = content.last_air_date ? format(new Date(Date.parse(content.last_air_date)), 'YYY') : "Undefined";
        }
        if(to !== undefined)
            return movieName + " TV (" + format(new Date(Date.parse(content.first_air_date)), 'YYY') + " - " + to + ")";
        else
            return movieName + " TV (" + format(new Date(Date.parse(content.first_air_date)), 'YYY') + ")";
    }
    let releaseYear = content.release_date ? format(new Date(Date.parse(content.release_date)), 'YYY') : null;
    return movieName + " (" + releaseYear + ")";
}
