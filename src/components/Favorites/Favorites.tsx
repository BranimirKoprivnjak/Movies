import { useState } from 'react';
import { useCustomSelector } from '../../hooks/use-redux';
import { MovieType } from '../../models/models';
import FetchData from '../DataFetching/FetchData';
import FavoritedMovie from './FavoritedMovie';
import classes from './Favorites.module.css';

type Props = {
  onClick?: () => void;
};

const Favorites = ({ onClick }: Props) => {
  const [favMoviesData, setFavMoviesData] = useState<MovieType[] | []>([]);

  const favoritedMovies = useCustomSelector(state => state.movies.favorited);

  const urls = favoritedMovies.map(
    movie =>
      `https://api.themoviedb.org/3/movie/${movie}?api_key=d59d597d72ecfb734e4a0faae065c386&language=en-US`
  );

  const handleData = (data: any) => {
    const moviesData = data.map((movie: any) => ({
      id: movie?.id,
      title: movie?.original_title,
      posterPath: movie?.poster_path,
    }));

    setFavMoviesData(moviesData);
  };

  return (
    <div onClick={onClick}>
      <FetchData
        urls={urls}
        handleData={handleData}
        dependencies={[favoritedMovies]}
      >
        {favMoviesData.length > 0 &&
          favMoviesData.map(favMovie => (
            <FavoritedMovie key={favMovie.id} data={favMovie} />
          ))}
        {favMoviesData.length === 0 && (
          <h3 className={classes.message}>List is empty!</h3>
        )}
      </FetchData>
    </div>
  );
};

export default Favorites;
