import {
  ADD_MOVIES,
  RENT_MOVIE,
  RETURN_MOVIE,
  SET_NEW_ARRIVALS
} from "./types";

export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies
  };
}

export function rentMovie(movie, name, phone, email) {
  return {
    type: RENT_MOVIE,
    movie,
    name,
    phone,
    email
  };
}

export function returnMovie(movie, name) {
  return {
    type: RETURN_MOVIE,
    movie,
    name
  };
}

export function setNewArrivals(newArrivals) {
  return {
    type: SET_NEW_ARRIVALS,
    newArrivals
  };
}
