/* eslint-disable react/prop-types */
import { Grid2 } from "@mui/material";

import useStyles from "./styles.js";
import Movie from '../Movie/Movie.jsx'

const MoviesList = ({ movies, numberOfMovie }) => {
  const classes = useStyles();
  return (
    <Grid2 container className={classes.moviesContainer} columnGap={'5rem'}>
      {movies?.slice(0, numberOfMovie).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid2>
  );
};

export default MoviesList;