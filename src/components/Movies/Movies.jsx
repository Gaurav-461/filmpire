/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Box,
  Skeleton,
  Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB.js";
import { MoviesList, PageNotFound} from '..'

const Movies = () => {
  const [page, setPage] = useState(1);
  
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, isError, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  console.log('Movies at home:-',data)

  if (isFetching) {
    return (
      <Box
        width="101%"
        height="100%"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        {Array.from(new Array(12)).map((__, index) => (
          <Box key={index} marginInline="10px">
            <Skeleton variant="rounded" width={180} height={263} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (!data?.results.length) {
    return (
      <>
        {searchQuery && (
          <p style={{ marginLeft: 12 }}>Search result for - {`" ${searchQuery} "`} not found</p>
        )}
        <Box display="flex" justifyContent="center" alignItems="center">
          <PageNotFound />
        </Box>
      </>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <PageNotFound label={"An Error has occurred !"} />
      </Box>
    );
  }

  return (
    <Box width="100%" overflow="hidden">
      <p style={{ marginLeft: 0 }}>
        {typeof genreIdOrCategoryName === "string" &&
          genreIdOrCategoryName.toUpperCase().split('_')}
      </p>
      {searchQuery && (
        <p style={{ marginLeft: 12 }}>Search result for - {searchQuery}</p>
      )}
      {/* <FeaturedMovie movie={data?.results[0]}/> */}
      <MoviesList movies={data?.results} />
      
      {/* Pagination */}
      <Box display={"flex"} justifyContent={"center"}>
        <Pagination page={data?.page} count={1000} onChange={(e, value) => setPage(value)} />
      </Box>
    </Box>
  );
};

export default Movies;
