import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { MOVIEDB_IMAGE_BASE_URL, MOVIEDB_IMAGE_POSTER_SIZE } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import { movieStyles } from "./styles/movie.styles";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(movieStyles);

const Movie = ({ movie }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton className={classes.icon} onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none"
          }
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs={4}>
            <img
              src={`${MOVIEDB_IMAGE_BASE_URL}${MOVIEDB_IMAGE_POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
              className={classes.poster}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              className={classes.details}
            >
              <Typography
                gutterBottom
                variant="h4"
                className={`${classes.text} ${classes.bottom}`}
              >
                {movie.title}
              </Typography>
              <Typography gutterBottom variant="h6" className={classes.text}>
                PLOT
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                className={`${classes.text} ${classes.bottom}`}
              >
                {movie.overview}
              </Typography>
              <Typography gutterBottom variant="h6" className={classes.text}>
                IMDB RATING
              </Typography>
              <div className={classes.rating}>
                <meter
                  min="0"
                  max="100"
                  optimum="100"
                  low="40"
                  high="70"
                  value={movie.vote_average * 10}
                  className={classes.meter}
                ></meter>
                <Typography variant="subtitle1" className={classes.text}>
                  {movie.vote_average}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </Fragment>
  );
};

Movie.propTypes = {
  movie: PropTypes.object
};

export default Movie;
