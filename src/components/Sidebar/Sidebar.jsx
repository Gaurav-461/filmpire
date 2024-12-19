/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CircularProgress,
  ListSubheader,
  Skeleton,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import genresIcon from "../../assets/genres/index.js";
import { redLogo, blueLogo } from "../../utils/links.js";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory.js";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, isError, isFetching } = useGetGenresQuery();

  if (isFetching) {
    return (
      <Box
        sx={{ pt: 0.5 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Skeleton height={"100px"} width={"90%"} />
        {Array.from(new Array(14)).map((__, index) => (
          <Box key={index} display="flex" width="100%" gap={1} padding="0 10px">
            <Skeleton key={index} width="15%" height="50px" />
            <Skeleton key={index} width="85%" height="50px" />
          </Box>
        ))}
      </Box>
    );
  }

  if (!data) {
    return <p></p>;
  }

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={label} className={classes.links} to={`/`}>
            <ListItem
              className={classes.links}
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
              }}
              button
            >
              <ListItemIcon>
                <img
                  className={classes.genreImages}
                  src={genresIcon[label.toLowerCase()]}
                  alt={value}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {data?.genres.map(({ id, name }) => (
          <Link key={name} className={classes.links} to={`/`}>
            <ListItem
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(id))}
              button
            >
              <ListItemIcon>
                <img
                  className={classes.genreImages}
                  src={genresIcon[name.toLowerCase()]}
                  alt={genresIcon[name]}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
