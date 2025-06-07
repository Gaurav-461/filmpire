/* eslint-disable no-unused-vars */
import {
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Grid2,
  Skeleton,
  Rating,
  CircularProgress,
  Pagination,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  Favorite,
  FavoriteBorderOutlined,
  ArrowBack,
  RemoveCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
  AddToQueue,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
} from "../../services/TMDB";
import useStyles from "./styles.js";
import genresIcon from "../../assets/genres/index.js";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory.js";
import { MoviesList } from "..";
import { userSelector } from "../../features/authSlice.js";
import config from "../../config/config.js";

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const classes = useStyles();

  const [moreCast, setMoreCast] = useState(6);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Favorite Movies
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  // WatchList Movies
  const { data: watchListMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  // Movie Information
  const { data, isFetching, isError } = useGetMovieQuery(id);

  // Movie Recommendations
  const {
    data: recommendations,
    isFetching: isFetchingRecommendation,
    isError: isRecommendationError,
  } = useGetRecommendationQuery({
    list: "recommendations",
    movie_id: id,
    page,
  });

  console.log("Movie Info:-", data);
  // console.log('favorite Movies:-',favoriteMovies)
  // console.log('watchList Movies:-',watchListMovies)

  const handleMoreCast = () => {
    if (moreCast === 6) {
      setMoreCast(60);
    } else {
      setMoreCast(6);
    }
  };

  useEffect(() => {
    setIsMovieFavorite(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [data, favoriteMovies]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchListMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [data, watchListMovies]);

  const addToFavorite = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        config.tmdbApiKey
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorite,
      }
    );

    setIsMovieFavorite((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        config.tmdbApiKey
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchListed,
      }
    );

    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box
        width="100%"
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size="5rem" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Link to="/">Something went wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <>
      {/* <section className={classes.backdropImageBlur} style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`}}></section> */}

      {/* Movie Information section */}
      <Grid2 container className={classes.containerSpaceAround}>
        {/* Lift Side */}
        <Grid2
          size={{ sm: "12", md: "2" }}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <img
            className={classes.poster}
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                : "https://via.assets.so/img.jpg?w=300&h=190&tc=black&bg=white"
            }
            alt={data.title}
          />
        </Grid2>

        {/* Right Side */}
        <Grid2 container direction="column" size={{ lg: 7 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>

          <Grid2 className={classes.containerSpaceAround}>
            <Box
              display="flex"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Rating readOnly value={data?.vote_average / 2} />
              <Typography>{data?.vote_average.toFixed(1)} / 10</Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min{" "}
              {data?.spoken_languages.length > 0
                ? `| ${data?.spoken_languages[0].english_name}`
                : ""}
            </Typography>
          </Grid2>

          <Grid2 className={classes.genresContainer}>
            {data?.genres.map(({ name, id }) => (
              <Link
                key={name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <img
                  className={classes.genresImage}
                  src={genresIcon[name.toLowerCase()]}
                  alt={genresIcon[name]}
                  width={30}
                />
                <Typography variant="subtitle1" color="textPrimary">
                  {name}
                </Typography>
              </Link>
            ))}
          </Grid2>
          <Grid2>
            <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
              Overview
            </Typography>
            <Typography style={{ marginBottom: "2rem" }}>
              {data?.overview}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Top Cast
            </Typography>
            <Grid2 container spacing={2}>
              {data?.credits?.cast
                ?.map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid2
                        key={i}
                        size={{ xs: 4, md: 2 }}
                        component={Link}
                        to={`/actor/${character.id}`}
                      >
                        <img
                          className={classes.castImage}
                          src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                          alt={`${character.original_name}`}
                        />
                        <Typography color="textPrimary">
                          {character.original_name}
                        </Typography>
                        <Typography color="textSecondary">
                          {character.character.split("/")[0]}
                        </Typography>
                      </Grid2>
                    )
                )
                .slice(0, moreCast)}
            </Grid2>
            {data?.credits?.cast.length > 1 && (
              <Button
                className={classes.showCastButton}
                onClick={handleMoreCast}
                endIcon={
                  moreCast === 6 ? <KeyboardArrowDown /> : <KeyboardArrowUp />
                }
              >
                {moreCast === 6 ? "More cast" : "Hide"}
              </Button>
            )}

            <Grid2 container marginTop="2rem">
              <div className={classes.buttonContainer}>
                <Grid2
                  size={{ xs: 12, sm: 6 }}
                  className={classes.buttonContainer}
                >
                  <ButtonGroup size="small" variant="outlined">
                    {data?.homepage && (
                      <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        href={data.homepage}
                        endIcon={<Language />}
                      >
                        website
                      </Button>
                    )}
                    <Button
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.imdb.com/title/${data.imdb_id}`}
                      endIcon={<MovieIcon />}
                    >
                      imdb
                    </Button>
                    {data?.videos.results.length > 0 && (
                      <Button
                        onClick={() => setOpen((prev) => !prev)}
                        href={"#"}
                        endIcon={<Theaters />}
                      >
                        trailer
                      </Button>
                    )}
                  </ButtonGroup>
                </Grid2>
                <Grid2
                  size={{ xs: 12, sm: 6 }}
                  className={classes.buttonContainer}
                >
                  <ButtonGroup size="small" variant="outlined">
                    <Button
                      onClick={addToFavorite}
                      endIcon={
                        isMovieFavorite ? (
                          <FavoriteBorderOutlined />
                        ) : (
                          <Favorite />
                        )
                      }
                    >
                      {isMovieFavorite ? "Unfavorite" : "favorite"}
                    </Button>
                    <Button
                      onClick={addToWatchList}
                      endIcon={
                        isMovieWatchListed ? <RemoveCircle /> : <AddToQueue />
                      }
                    >
                      {isMovieWatchListed ? "Remove" : "WatchList"}
                    </Button>
                    <Button
                      endIcon={<ArrowBack />}
                      sx={{ borderColor: "primary.main" }}
                    >
                      <Typography
                        component={Link}
                        onClick={() => navigate(-1)}
                        color="inherit"
                        variant="subtitle2"
                      >
                        back
                      </Typography>
                    </Button>
                  </ButtonGroup>
                </Grid2>
              </div>
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Movie Recommendations section */}
        {recommendations?.total_pages !== 0 && (
          <Box marginTop="5rem" width="100%">
            <Typography variant="h3" gutterBottom align="center">
              You might also like
            </Typography>
            {/* Loop through the recommendation movie */}
            {recommendations ? (
              <MoviesList
                movies={recommendations?.results}
                numberOfMovie={12}
              />
            ) : (
              <Box display="flex" justifyContent="center">
                Sorry, nothing was found
              </Box>
            )}
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              marginTop={2}
            >
              <Pagination
                page={page}
                count={recommendations?.total_pages}
                onChange={(__, value) => setPage(value)}
              />
            </Box>
          </Box>
        )}

        <Modal
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClose={() => setOpen((prev) => !prev)}
        >
          <iframe
            autoPlay
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        </Modal>
      </Grid2>
    </>
  );
};

export default MovieInformation;
