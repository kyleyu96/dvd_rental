import { SET_GENRES } from "../actions/types";

const initialState = {
  genres: []
};

function genres(state = initialState, action) {
  switch (action.type) {
    case SET_GENRES:
      return {
        genres: action.genres
      };
    default:
      return state;
  }
}

export default genres;
