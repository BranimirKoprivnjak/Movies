import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MaterialIcon from '../components/UI/MaterialIcon';
import { minutesToHoursMinutes } from '../helpers/helpers';
import { DetailedMovieType } from '../models/models';
import classes from './MoviePage.module.css';
import MovieInfo from '../components/Movies/MovieInfo';
import { useCustomDispatch, useCustomSelector } from '../hooks/use-redux';
import { moviesActions } from '../store/movies-slice';
import FetchData from '../components/DataFetching/FetchData';

const MoviePage = () => {
  const [movie, setMovie] = useState<DetailedMovieType>();

  const { movieId } = useParams();

  const favoritedMovies = useCustomSelector(state => state.movies.favorited);
  const movieInFavorites = favoritedMovies.includes(movieId as string);

  const dispatch = useCustomDispatch();

  const handleData = (data: any) => {
    const [movieData] = data;

    const movie = {
      id: movieData?.id,
      genres: movieData?.genres,
      title: movieData?.original_title,
      overview: movieData?.overview,
      posterPath: movieData?.poster_path,
      releaseDate: movieData?.release_date,
      duration: movieData?.runtime,
    };

    setMovie(movie);
  };

  const handleBookmarkClick = () => {
    dispatch(moviesActions.addRemoveMovie(movieId as string));
  };

  return (
    <>
      <FetchData
        urls={[
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=d59d597d72ecfb734e4a0faae065c386&language=en-US`,
        ]}
        handleData={handleData}
        containerClass={classes.container}
        dependencies={[movieId]}
      >
        {movie !== undefined && (
          <div className={classes.wrapper}>
            <img
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
            />
            <div className={classes.infos}>
              <h2 className={classes.title}>{movie.title}</h2>
              <div className={classes['bookmark-wrapper']}>
                <MaterialIcon
                  type="bookmark"
                  className={`${classes.bookmark} ${
                    movieInFavorites ? classes.favorited : ''
                  }`}
                  onClick={handleBookmarkClick}
                />
              </div>
              <MovieInfo description="Overview" text={movie.overview} />
              <MovieInfo
                description="Genres"
                text={movie.genres.map(item => item.name).join(', ')}
              />
              <MovieInfo
                description="Duration"
                text={minutesToHoursMinutes(movie.duration)}
              />
              <MovieInfo description="Release Date" text={movie.releaseDate} />
            </div>
          </div>
        )}
      </FetchData>
    </>
  );
};

export default MoviePage;
