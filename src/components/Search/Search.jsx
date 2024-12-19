/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  searchMovie,
  selectGenreOrCategory,
} from "../../features/currentGenreOrCategory.js";
import useStyles from "./styles";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
      setQuery("");
      navigate('/')
    }
  };

  return (
    <div className={classes.searchContainer}>
      <InputAdornment position="start"><SearchIcon /></InputAdornment>
      <TextField
        slotProps={{
          htmlInput: {
            className: classes.searchField,
          },
        }}
        // className={classes.searchField}
        placeholder="Search"
        variant="standard"
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
