import { useState } from 'react';
import { MovieType } from '../../models/models';
import Movie from './Movie';
import classes from './MoviesByGenre.module.css';
import FetchData from '../DataFetching/FetchData';

type Props = {
  genreId: number;
  genre: string;
};

const MoviesByGenre = ({ genreId, genre }: Props) => {
  const [movies, setMovies] = useState<MovieType[] | []>([]);

  const handleData = (data: any) => {
    if (data[0].results !== undefined) {
      const moviesData = data[0].results.map((movie: any) => ({
        id: movie?.id.toString(),
        posterPath: movie?.poster_path,
        title: movie?.original_title,
      }));

      setMovies(moviesData);
    } else {
      throw new Error();
    }
  };

  return (
    <FetchData
      urls={[
        `https://api.themoviedb.org/3/discover/movie?api_key=d59d597d72ecfb734e4a0faae065c386&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`,
      ]}
      handleData={handleData}
      containerClass={classes.container}
    >
      <h2 className={classes.genre}>{genre}</h2>
      <div className={classes.movies}>
        {movies.length > 0 &&
          movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </div>
    </FetchData>
  );
};

export default MoviesByGenre;
