import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  useGetActorDetailsQuery,
  useGetActorMoviesQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import MoviesList from "../MoviesList/MoviesList";
import { useState } from "react";

const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showPara, setShowPara] = useState(900);

  const { data, isFetching, isError } = useGetActorDetailsQuery(id);
  const {
    data: actorMovies,
  } = useGetActorMoviesQuery({ id, page });

  const handleShowPara = () => {
    if (showPara === 900) {
      setShowPara(10000);
    } else {
      setShowPara(900);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isFetching) {
    return (
      <>
        <Box
          width="100%"
          height="80vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size="5rem" />
        </Box>
      </>
    );
  }

  if (isError) {
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <h3>Sorry, something went wrong.</h3>
      </Box>
    </>;
  }

  return (
    <>
      <section>
        <Grid2 container className={classes.containerSpaceAround} spacing={3}>
          {/* Lift side */}
          <Grid2>
            <img
              className={classes.profileImage}
              src={
                data?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${data?.profile_path}`
                  : "https://via.assets.so/img.jpg?w=300&h=190&tc=black&bg=white"
              }
              alt={data?.title}
            />
          </Grid2>

          {/* Right side */}
          <Grid2 container direction="column" size={{ lg: 6 }}>
            <Typography variant="h2" gutterBottom align="center">
              {data?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {`Born: ${new Date(data?.birthday).toDateString()}`}
            </Typography>
            {data?.deathday && (
              <Typography variant="h5" gutterBottom>
                {`Death day: ${new Date(data?.deathday).toDateString()}`}
              </Typography>
            )}
            <Typography>
              {data?.biography.slice(0, showPara)}{" "}
              {data?.biography.length > 900 && (
                <Button onClick={handleShowPara}>
                  {showPara === 900 ? "...show more" : "less"}
                </Button>
              )}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-around"
              width="100%"
              marginTop={5}
            >
              <Button
                variant="contained"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${data?.imdb_id}`}
              >
                imdb
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                back
              </Button>
            </Box>
          </Grid2>

          <Box paddingTop={5}>
            <Typography align="center" gutterBottom variant="h4">
              Movies
            </Typography>
            {actorMovies ? (
              <MoviesList movies={actorMovies?.results} numberOfMovie={12} />
            ) : (
              <Box display="flex" justifyContent="center">
                Sorry, nothing was found
              </Box>
            )}
            <Box display={"flex"} justifyContent="center" alignItems='center' marginTop={2}>
              <Pagination
                page={page}
                count={actorMovies?.total_pages }
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          </Box>
        </Grid2>
      </section>
    </>
  );
};

export default Actors;
