import { connect } from "react-redux";
import { fetchGenres, fetchMovies } from "../services/moviedb";
import Main from "../components/main";

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    genres: state.genres.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenres: () => {
      dispatch(fetchGenres());
    },
    fetchMovies: page => {
      dispatch(fetchMovies(page));
    }
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer;
