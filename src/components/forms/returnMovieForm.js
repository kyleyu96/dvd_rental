import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Autosuggest from "../autosuggest";

import { makeStyles } from "@material-ui/core/styles";
import { formsStyles } from "../styles/forms.styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(formsStyles);

const ReturnMovieForm = ({ movies, returnMovie }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moviesToReturn = movies.filter(m => m.renters.length > 0);
  const moviesSuggestions = moviesToReturn.map(m => ({ label: m.title }));

  const selectedMovie = selectedItem
    ? movies.find(m => m.title === selectedItem)
    : null;
  const renters = selectedMovie ? selectedMovie.renters : [];
  const namesSuggestions = renters.map(r => ({ label: r.name }));

  const resetForm = () => {
    setSelectedItem("");
    setName("");
  };

  const onSubmit = e => {
    e.preventDefault();
    const movie = movies.find(m => m.title === selectedItem);
    returnMovie(movie, name);
    resetForm();
    handleClose();
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.button}
      >
        <Typography>RETURN</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle>Return a Movie</DialogTitle>
        <DialogContent>
          <form
            id="return-movie-form"
            onSubmit={e => onSubmit(e)}
            className={classes.bottomSpacing}
          >
            <Autosuggest
              suggestions={moviesSuggestions}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              label="Movie"
              placeholder="Search for a movie"
            />
            <Autosuggest
              suggestions={namesSuggestions}
              selectedItem={name}
              setSelectedItem={setName}
              label="Name"
              placeholder="Search for a renter"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="return-movie-form" color="primary">
            Return
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

ReturnMovieForm.propTypes = {
  movies: PropTypes.array,
  returnMovie: PropTypes.func.isRequired
};

export default ReturnMovieForm;
