export const minutesToHoursMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} h ${minutes} min`;
};

export const addRemoveMovieToStorage = (movieId: string) => {
  if (!localStorage.getItem('movies'))
    localStorage.setItem('movies', JSON.stringify([]));

  const favouritedMovies: string[] = JSON.parse(
    localStorage.getItem('movies') as string
  );
  if (favouritedMovies.includes(movieId)) {
    const idx = favouritedMovies.indexOf(movieId);
    favouritedMovies.splice(idx, 1);
  } else {
    favouritedMovies.push(movieId);
  }
  localStorage.setItem('movies', JSON.stringify(favouritedMovies));
};

export const checkIfMovieInStorage = (movieId: string) => {
  if (!localStorage.getItem('movies')) return false;

  const favouritedMovies: string[] = JSON.parse(
    localStorage.getItem('movies') as string
  );

  return favouritedMovies.includes(movieId) ? true : false;
};
