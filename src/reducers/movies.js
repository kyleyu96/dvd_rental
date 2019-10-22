import {
  ADD_MOVIES,
  RENT_MOVIE,
  RETURN_MOVIE,
  SET_NEW_ARRIVALS
} from "../actions/types";

const initialState = {
  movies: [],
  newArrivals: []
};

function movies(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        movies: [...action.movies, ...state.movies]
      };
    case RENT_MOVIE:
      const { movie, name, email, phone } = action;
      const updatedMovie = {
        ...movie,
        renters: [...movie.renters, { name, email, phone }],
        stock: movie.stock - 1
      };
      const otherMovies = state.movies.filter(m => m.title !== movie.title);
      return {
        ...state,
        movies: [updatedMovie, ...otherMovies]
      };
    case RETURN_MOVIE:
      const updateMovie = {
        ...action.movie,
        renters: [...action.movie.renters.filter(r => r.name !== action.name)],
        stock: action.movie.stock + 1
      };
      const otherMovie = state.movies.filter(
        m => m.title !== action.movie.title
      );
      return {
        ...state,
        movies: [updateMovie, ...otherMovie]
      };
    case SET_NEW_ARRIVALS:
      return {
        ...state,
        newArrivals: action.newArrivals
      };
    default:
      return state;
  }
}

export default movies;
