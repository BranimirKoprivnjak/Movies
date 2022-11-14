import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addRemoveMovieToStorage } from '../helpers/helpers';
import { FavoritedMoviesType } from '../models/models';

const storage: string[] =
  localStorage.getItem('movies') === null
    ? []
    : JSON.parse(localStorage.getItem('movies') as string);

const initialState: FavoritedMoviesType = {
  favorited: storage,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addRemoveMovie(state: FavoritedMoviesType, action: PayloadAction<string>) {
      const favoritedMovies = state.favorited;
      const movieId = action.payload;
      const existingMovie = favoritedMovies.includes(movieId);
      if (existingMovie) {
        const idxToRemove = favoritedMovies.indexOf(movieId);
        favoritedMovies.splice(idxToRemove, 1);
      } else {
        favoritedMovies.push(movieId);
      }
      addRemoveMovieToStorage(movieId);
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;
