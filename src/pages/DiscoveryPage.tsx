import { useState } from 'react';
import { GenreType } from '../models/models';
import MoviesByGenre from '../components/Movies/MoviesByGenre';
import classes from './DiscoveryPage.module.css';
import FetchData from '../components/DataFetching/FetchData';
import Filter from '../components/FIlter/Filter';

const DiscoveryPage = () => {
  const [genres, setGenres] = useState<GenreType[] | []>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const handleData = (data: any) => {
    if (data[0].genres !== undefined) setGenres(data[0].genres);
    else throw new Error();
  };

  const filteredMovies = () => {
    return filters.length === 0
      ? genres
      : genres.filter(genre => filters.includes(genre.name));
  };

  return (
    <>
      <FetchData
        urls={[
          'https://api.themoviedb.org/3/genre/movie/list?api_key=d59d597d72ecfb734e4a0faae065c386&language=en-US',
        ]}
        handleData={handleData}
        containerClass={classes.container}
      >
        {genres.length > 0 && (
          <Filter genres={genres} filters={filters} setFilters={setFilters} />
        )}
        {genres.length > 0 &&
          filteredMovies().map(genre => (
            <MoviesByGenre
              key={genre.id}
              genreId={genre.id}
              genre={genre.name}
            />
          ))}
      </FetchData>
    </>
  );
};

export default DiscoveryPage;
