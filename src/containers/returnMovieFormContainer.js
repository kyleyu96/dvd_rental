import { connect } from "react-redux";
import { returnMovie } from "../actions/movies";
import ReturnMovieForm from "../components/forms/returnMovieForm";

const mapStateToProps = state => {
  return {
    movies: state.movies.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    returnMovie: (movie, name) => {
      dispatch(returnMovie(movie, name));
    }
  };
};

const ReturnMovieFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnMovieForm);

export default ReturnMovieFormContainer;
