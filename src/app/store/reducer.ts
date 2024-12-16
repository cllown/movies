import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as MovieActions from './actions';

export const MovieReducer = createReducer(
  initialState,

  on(MovieActions.loadAllMoviesSuccess, (state, { movies }) => ({
    ...state,
    allMovies: movies,
  })),

  on(MovieActions.loadAllMoviesFailure, (state, { error }) => ({
    ...state,
    allMovies: null,
    error: error,
  })),

  on(MovieActions.loadPopularMoviesSuccess, (state, { movies }) => ({
    ...state,
    popularMovies: movies,
  })),

  on(MovieActions.loadPopularMoviesFailure, (state, { error }) => ({
    ...state,
    popularMovies: null,
    error: error,
  })),

  on(MovieActions.loadNowPlayingMoviesSuccess, (state, { movies }) => ({
    ...state,
    nowPlayingMovies: movies,
  })),

  on(MovieActions.loadNowPlayingMoviesFailure, (state, { error }) => ({
    ...state,
    nowPlayingMovies: null,
    error: error,
  })),

  on(MovieActions.loadTopRatedMoviesSuccess, (state, { movies }) => ({
    ...state,
    topRatedMovies: movies,
  })),

  on(MovieActions.loadTopRatedMoviesFailure, (state, { error }) => ({
    ...state,
    topRatedMovies: null,
    error: error,
  })),

  on(MovieActions.loadUpComingMoviesSuccess, (state, { movies }) => ({
    ...state,
    upComingMovies: movies,
  })),

  on(MovieActions.loadUpComingMoviesFailure, (state, { error }) => ({
    ...state,
    upComingMovies: null,
    error: error,
  }))
);
