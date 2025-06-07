/* eslint-disable react/prop-types */
import { Typography, Grid2, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Movie = ({ movie, i }) => {
  const classes = useStyles();

  // console.log('Movie details:-', movie)

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 200}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            className={classes.image}
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : "https://via.assets.so/img.jpg?w=300&h=190&tc=black&bg=white"
            }
            alt={movie?.title}
          />
          <Typography className={classes.title} variant="p" paddingInline={2}>
            {movie?.title}
          </Typography>
          <Tooltip disableTouchListener title={movie?.vote_average ? `${movie?.vote_average.toFixed(1)} / 10`: '0 / 10'}>
            <div>
              <Rating readOnly value={movie?.vote_average ? parseInt((movie?.vote_average / 2).toFixed(1)) : '0 / 10'}/>
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid2>
  );
};

export default Movie;
