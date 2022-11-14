import store from '../store/redux';

export interface GenreType {
  id: number;
  name: string;
}

export interface MovieType {
  id: string;
  title: string;
  posterPath: string;
}

export interface DetailedMovieType extends MovieType {
  genres: GenreType[];
  overview: string;
  releaseDate: string;
  duration: number;
}

// redux
export interface FavoritedMoviesType {
  favorited: string[];
}

// https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
