/* eslint-disable react/prop-types */
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const FeaturedMovie = ({ movie }) => {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`movie/${movie.id}`}
      className={classes.featuredCardContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          alt={movie.title}
          media="picture"
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          className={classes.cardMedia}
          title={movie.title}
        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
