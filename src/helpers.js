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

export const searchContentTitle = (movie) => {
  let movieName = movieTitle(movie);
  let isActor = movie.media_type === "person";
  let isTV = !!movie.first_air_date;
  if(isActor) return movieName + " ("+ movie.known_for_department +")";
  if(isTV) return movieName + " TV (" + format(new Date(Date.parse(movie.first_air_date)), 'YYY') + ")";
  let releaseYear = movie.release_date ? format(new Date(Date.parse(movie.release_date)), 'YYY') : null;
  return movieName + " (" + releaseYear  + ")";
}
