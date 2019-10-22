import React, { Fragment } from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const Categories = ({ movies, genres, category, handleCategoryChange }) => {
  return (
    <List component="nav">
      <ListItem
        button
        onClick={() => handleCategoryChange(0)}
        disabled={category === 0}
      >
        <ListItemText primary={`All (${movies.length})`} />
      </ListItem>
      {genres.map(g => {
        const count = movies.filter(m => m.genre_ids.includes(g.id)).length;
        return (
          count !== 0 && (
            <Fragment key={g.id}>
              <Divider />
              <ListItem
                button
                onClick={() => handleCategoryChange(g.id)}
                disabled={category === g.id}
              >
                <ListItemText primary={`${g.name} (${count})`} />
              </ListItem>
            </Fragment>
          )
        );
      })}
    </List>
  );
};

Categories.propTypes = {
  movies: PropTypes.array,
  genres: PropTypes.array,
  category: PropTypes.number,
  handleCategoryChange: PropTypes.func.isRequired
};

export default Categories;
