import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreIdOrCategoryName: "",
  page: 1,
  searchQuery: "",
};

const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = ""
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload
    }
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
