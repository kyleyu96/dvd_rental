import { MOVIEDB_API_URL, MOVIEDB_API_KEY } from "../config";
import { formatDate } from "../utils/date";
import { addMovies, setNewArrivals } from "../actions/movies";
import { setGenres } from "../actions/genres";

function constructUrl(endpoint, params = {}) {
  let base = `${MOVIEDB_API_URL}${endpoint}?api_key=${MOVIEDB_API_KEY}`;
  return Object.keys(params).reduce((acc, cur) => {
    return `${acc}&${cur}=${params[cur]}`;
  }, base);
}

export function fetchNewArrivals() {
  let d = new Date();
  const now = formatDate(d);
  d.setDate(d.getDate() - 14);
  const twoWeeksAgo = formatDate(d);

  const params = {
    language: "en-US",
    sort_by: "popularity.desc",
    "release_date.gte": twoWeeksAgo,
    "release_date.lte": now,
    region: "CA"
  };

  return dispatch => {
    fetch(constructUrl("/discover/movie", params))
      .then(res => res.json())
      .then(res => {
        dispatch(setNewArrivals(res.results));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchGenres() {
  return dispatch => {
    fetch(constructUrl("/genre/movie/list"))
      .then(res => res.json())
      .then(res => {
        dispatch(setGenres(res.genres));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchMovies(page = 1) {
  let d = new Date();
  d.setDate(d.getDate() - 30);
  const after = formatDate(d);
  d.setDate(d.getDate() - 30);
  const before = formatDate(d);

  const params = {
    language: "en-US",
    sort_by: "popularity.desc",
    "release_date.gte": before,
    "release_date.lte": after,
    region: "CA",
    page
  };
  return dispatch => {
    fetch(constructUrl("/discover/movie", params))
      .then(res => res.json())
      .then(res => {
        res.results.forEach(m => {
          m.stock = 3;
          m.rate = 5;
          m.renters = [];
        });
        dispatch(addMovies(res.results));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
