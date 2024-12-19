/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useEffect } from "react";

import { userSelector } from "../../features/authSlice";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCard } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log("User data:-", user);

  const { data: favoriteMovies, refetch: refetchFavorite } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    refetchFavorite();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {favoriteMovies?.results.length && watchListMovies?.results.length ? (
        <Box>
          <RatedCard data={favoriteMovies} title={'FAVORITE MOVIES'}/>
          <RatedCard data={watchListMovies} title={'WATCHLIST'}/>
        </Box>
      ) : (
        <Typography variant="h5">
          Add favorite or watch-list movies to see them here!
        </Typography>
      )}
    </Box>
  );
};
export default Profile;
