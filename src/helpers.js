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
    console.log(content);
    let title = movieTitle(content);
    let to;
    let isActor = content.media_type === "person";
    let isTV = content.media_type === "tv" || typeof content.first_air_date !== "undefined";
    if (typeof content.media_type === "undefined" && typeof content.number_of_seasons !== "undefined") {
        isTV = true;
    }
    if (isActor) return title + " (" + content.known_for_department + ")";
    if (isTV) {
        if (content.status === "Returning Series" || content.status === "In Production" || content.status === "Planned") {
            to = "Present";
        } else if (content.status === "Ended" || content.status === "Canceled" || content.status === "Pilot") {
            to = content.last_air_date ? format(new Date(Date.parse(content.last_air_date)), 'YYY') : "Undefined";
        }
        if (to !== undefined && content.first_air_date) {
            return title + " TV (" + format(new Date(Date.parse(content.first_air_date)), 'YYY') + " - " + to + ")";
        } else if (content.first_air_date) {
            return title + " TV (" + format(new Date(Date.parse(content.first_air_date)), 'YYY') + ")";
        } else {
            return title + " TV (unknown)";
        }
    }
    let releaseYear = content.release_date ? format(new Date(Date.parse(content.release_date)), 'YYY') : null;
    return title + " (" + releaseYear + ")";
}

export const trimmedOverview = (overview, length = 430) => {
    if (overview?.length > length) {
        return overview.substring(0, length) + "...";
    }

    return overview;
}
