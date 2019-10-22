import { connect } from "react-redux";
import { addMovies } from "../actions/movies";
import { fetchNewArrivals } from "../services/moviedb";
import NewMovieForm from "../components/forms/newMovieForm";

const mapStateToProps = state => {
  return {
    newArrivals: state.movies.newArrivals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMovies: movies => {
      dispatch(addMovies(movies));
    },
    fetchNewArrivals: page => {
      dispatch(fetchNewArrivals(page));
    }
  };
};

const NewMovieFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMovieForm);

export default NewMovieFormContainer;
