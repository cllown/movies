import { Routes, CanActivate } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page/movie-details-page.component';
import { NowPlayingMoviePageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { TopRatedMoviePageComponent } from './pages/top-rated-movie-page/top-rated-movie-page.component';
import { UpcomingMoviePageComponent } from './pages/upcoming-movie-page/upcoming-movie-page.component';
import { PopularMoviePageComponent } from './pages/popular-movie-page/popular-movie-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page/movie-list-page.component';
import { FavoriteMovieComponent } from './components/favorite-movie/favorite-movie.component';
import { WatchListMovieComponent } from './components/watch-list-movie/watch-list-movie.component';
import { NowPlayingMoviesResolver } from './guards/now-playing-movies.resolver';
import { TopRatedMoviesResolver } from './guards/to-rated-movies.resolver';
import { UpComingMoviesResolver } from './guards/up-coming-movies.resolver';
import { PopularMoviesResolver } from './guards/popular-movies.resolver';
import { AuthGuard } from './guards/auth-guard';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { AllMoviePageComponent } from './pages/all-movies-page/all-movies-page.component';

export const routes: Routes = [
   {path:'', component: AllMoviePageComponent,resolve: {movies: NowPlayingMoviesResolver}},
   {path:'movie/:id', component: MovieDetailsPageComponent},
   {path:'now-playing', component: NowPlayingMoviePageComponent,resolve: {movies: NowPlayingMoviesResolver}},
   {path:'top-rated', component: TopRatedMoviePageComponent,resolve: {movies: TopRatedMoviesResolver}},
   {path:'upcoming', component: UpcomingMoviePageComponent,resolve: {movies: UpComingMoviesResolver}},
   {path:'popular', component: PopularMoviePageComponent, resolve: {movies: PopularMoviesResolver}},
   {path: 'favorite', component: FavoriteMovieComponent, canActivate: [AuthGuard]},
   {path: 'watch-list', component: WatchListMovieComponent, canActivate: [AuthGuard]},
   {path: 'login-popup', component: LoginPopupComponent},
];
