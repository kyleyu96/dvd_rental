import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Autosuggest from "../autosuggest";

import { withStyles } from "@material-ui/styles";
import { formsStyles } from "../styles/forms.styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

class NewMovieForm extends Component {
  state = {
    selectedMovie: "",
    stock: 3,
    rate: 5,
    open: false
  };

  componentDidMount() {
    this.props.fetchNewArrivals();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetForm = () => {
    this.setState({
      selectedMovie: "",
      stock: 3,
      rate: 5
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { newArrivals, addMovies } = this.props;
    const { selectedMovie, rate, stock } = this.state;
    const newMovie = newArrivals.find(n => n.title === selectedMovie);
    newMovie.stock = stock;
    newMovie.rate = rate;
    newMovie.renters = [];
    addMovies([newMovie]);
    this.resetForm();
    this.handleClose();
  };

  render() {
    const { classes, newArrivals } = this.props;
    const { open, selectedMovie, stock, rate } = this.state;

    const suggestions = newArrivals.map(n => ({ label: n.title }));
    return (
      <Fragment>
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          className={classes.button}
        >
          <Typography>ADD</Typography>
        </Button>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Add a Movie</DialogTitle>
          <DialogContent>
            <form
              id="add-movie-form"
              onSubmit={e => this.onSubmit(e)}
              className={classes.bottomSpacing}
            >
              <Autosuggest
                suggestions={suggestions}
                selectedItem={selectedMovie}
                setSelectedItem={movie =>
                  this.setState({ selectedMovie: movie })
                }
                label="Movie"
                placeholder="Search for a movie"
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                fullWidth
                required
                value={stock}
                onChange={e => this.setState({ stock: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Rate"
                type="number"
                fullWidth
                required
                value={rate}
                onChange={e => this.setState({ rate: e.target.value })}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button type="submit" form="add-movie-form" color="primary">
              ADD
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

NewMovieForm.propTypes = {
  classes: PropTypes.object.isRequired,
  newArrivals: PropTypes.array,
  addMovies: PropTypes.func.isRequired
};

export default withStyles(formsStyles)(NewMovieForm);
