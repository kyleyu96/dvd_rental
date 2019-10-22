import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Autosuggest from "../autosuggest";

import { makeStyles } from "@material-ui/core/styles";
import { formsStyles } from "../styles/forms.styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(formsStyles);

const RentMovieForm = ({ movies, rentMovie }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moviesToRent = movies.filter(m => m.stock > 0);
  const suggestions = moviesToRent.map(m => ({ label: m.title }));

  const resetForm = () => {
    setSelectedItem("");
    setName("");
    setPhone("");
    setEmail("");
  };

  const onSubmit = e => {
    e.preventDefault();
    const movie = movies.find(m => m.title === selectedItem);
    rentMovie(movie, name, phone, email);
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
        <Typography>RENT</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rent a Movie</DialogTitle>
        <DialogContent>
          <form id="rent-movie-form" onSubmit={e => onSubmit(e)}>
            <Autosuggest
              suggestions={suggestions}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              label="Movie"
              placeholder="Search for a movie"
            />
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="rent-movie-form" color="primary">
            Rent
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

RentMovieForm.propTypes = {
  movies: PropTypes.array,
  rentMovie: PropTypes.func.isRequired
};

export default RentMovieForm;
