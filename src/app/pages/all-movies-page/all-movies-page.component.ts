import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Movie } from '../../mock-data';
import { MovieCardPrimeNgComponent } from '../../components/movie-card-primeng/movie-card-prime-ng.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-movie-page',
  standalone: true,
  templateUrl: './all-movies-page.component.html',
  styleUrl: './all-movies-page.component.scss',
  imports: [
    HeaderComponent,
    MovieCardPrimeNgComponent,
    MovieListComponent,
    CommonModule,
  ],
})
export class AllMoviePageComponent {
  constructor(private store: Store) {}

  movies$!: Observable<Movie[] | null>;

  ngOnInit(): void {
    this.movies$ = this.store.select(selectAllMovies);
  }
}
