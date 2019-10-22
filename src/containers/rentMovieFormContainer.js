import { connect } from "react-redux";
import { rentMovie } from "../actions/movies";
import RentMovieForm from "../components/forms/rentMovieForm";

const mapStateToProps = state => {
  return {
    movies: state.movies.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rentMovie: (movie, name, phone, email) => {
      dispatch(rentMovie(movie, name, phone, email));
    }
  };
};

const RentMovieFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RentMovieForm);

export default RentMovieFormContainer;
