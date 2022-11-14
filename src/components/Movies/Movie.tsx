import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../hooks/use-redux';
import { MovieType } from '../../models/models';
import { moviesActions } from '../../store/movies-slice';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Movie.module.css';

type Props = {
  movie: MovieType;
};

const Movie = ({ movie }: Props) => {
  const favoritedMovies = useCustomSelector(state => state.movies.favorited);
  const movieInFavorites = favoritedMovies.includes(movie.id);

  const dispatch = useCustomDispatch();

  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    dispatch(moviesActions.addRemoveMovie(movie.id));
  };

  return (
    <div className={classes.container}>
      <MaterialIcon
        type="bookmark"
        className={`${classes.bookmark} ${
          movieInFavorites ? classes.favorited : ''
        }`}
        onClick={handleBookmarkClick}
      />
      <img
        className={classes.image}
        src={`https://image.tmdb.org/t/p/w200/${movie.posterPath}`}
        alt={`Poster from ${movie.title}`}
        onClick={() => navigate(`/${movie.id}`)}
      />
    </div>
  );
};
export default Movie;
