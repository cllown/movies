import { Movie } from '../mock-data';

export interface MovieState {
  allMovies: Movie[] | null;
  favoriteMovies: Movie[] | null;
  watchListMovies: Movie[] | null;
  selectedMovie: Movie | null;
  popularMovies: Movie[] | null;
  nowPlayingMovies: Movie[] | null;
  topRatedMovies: Movie[] | null;
  upComingMovies: Movie[] | null;
}

export const initialState: MovieState = {
  allMovies: null,
  favoriteMovies: null,
  watchListMovies: null,
  selectedMovie: null,
  popularMovies: null,
  nowPlayingMovies: null,
  topRatedMovies: null,
  upComingMovies: null,
};
