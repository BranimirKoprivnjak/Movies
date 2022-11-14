import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { MovieType } from '../../models/models';
import classes from './FavoritedMovie.module.css';

type Props = {
  data: MovieType;
};

const FavoritedMovie = ({ data }: Props) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/${data.id}`);
  };

  return (
    <div onClick={handlePosterClick} className={classes.container}>
      <div>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w200/${data.posterPath}`}
        />
      </div>
      <h3 className={classes.title}>{data.title}</h3>
    </div>
  );
};

export default FavoritedMovie;
