import { SET_GENRES } from "./types";

export function setGenres(genres) {
  return {
    type: SET_GENRES,
    genres
  };
}
