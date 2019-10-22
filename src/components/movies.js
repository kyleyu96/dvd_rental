import React from "react";
import PropTypes from "prop-types";
import { MOVIEDB_IMAGE_BASE_URL, MOVIEDB_IMAGE_POSTER_SIZE } from "../config";
import Movie from "./movie";

import { makeStyles } from "@material-ui/core/styles";
import { moviesStyles } from "./styles/movies.styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles(moviesStyles);

const Movies = ({ toShow }) => {
  const classes = useStyles();
  return (
    <GridList cellHeight={360} cols={4} spacing={20}>
      {toShow.map(movie => (
        <GridListTile key={movie.title} className={classes.tile}>
          <img
            src={`${MOVIEDB_IMAGE_BASE_URL}${MOVIEDB_IMAGE_POSTER_SIZE}${movie.poster_path}`}
            alt={movie.title}
            className={movie.stock === 0 ? classes.soldout : ""}
          />
          <GridListTileBar
            title={movie.title}
            subtitle={
              movie.stock === 0
                ? "Out of Stock"
                : `${movie.stock} copie${movie.stock > 1 ? "s" : ""} in store`
            }
            actionIcon={<Movie movie={movie} />}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

Movies.propTypes = {
  toShow: PropTypes.array
};

export default Movies;
