import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";
import Movies from "./movies";
import Categories from "./categories";

import { withStyles } from "@material-ui/styles";
import { mainStyles } from "./styles/main.styles";
import Grid from "@material-ui/core/Grid";

class Main extends Component {
  state = {
    searchString: "",
    category: 0
  };

  handleSearchStringChange = searchString => {
    this.setState({ searchString });
  };

  handleCategoryChange = category => {
    this.setState({ category });
  };

  componentDidMount() {
    const { fetchGenres, fetchMovies } = this.props;
    fetchGenres();
    fetchMovies(1);
    fetchMovies(2);
    fetchMovies(3);
  }

  render() {
    const { classes, movies, genres } = this.props;
    const { searchString, category } = this.state;
    const toShow = movies.filter(
      m =>
        (category === 0 || m.genre_ids.includes(category)) &&
        m.title.toLowerCase().startsWith(searchString.toLowerCase())
    );
    return (
      <Fragment>
        <Navbar
          searchString={searchString}
          handleSearchStringChange={this.handleSearchStringChange}
        />
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          className={classes.container}
        >
          <Grid item xs={3} className={classes.column}>
            <Categories
              movies={movies}
              genres={genres}
              category={category}
              handleCategoryChange={this.handleCategoryChange}
            />
          </Grid>
          <Grid item xs={9} className={classes.column}>
            <Movies toShow={toShow} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array,
  genres: PropTypes.array,
  fetchGenres: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired
};

export default withStyles(mainStyles)(Main);
