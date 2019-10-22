import React from "react";
import PropTypes from "prop-types";
import NewMovieFormContainer from "../containers/newMovieFormContainer";
import RentMovieFormContainer from "../containers/rentMovieFormContainer";
import ReturnMovieFormContainer from "../containers/returnMovieFormContainer";

import { makeStyles } from "@material-ui/core/styles";
import { navbarStyles } from "./styles/navbar.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(navbarStyles);

const Navbar = ({ searchString, handleSearchStringChange }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs={3}>
            <Typography variant="h5">YYY - DVD Rental</Typography>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchString}
                onChange={e => handleSearchStringChange(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={5} className={classes.menu}>
            <NewMovieFormContainer />
            <RentMovieFormContainer />
            <ReturnMovieFormContainer />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired
};

export default Navbar;
