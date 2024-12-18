import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAllMovies } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class NowPlayingMoviesResolver implements Resolve<boolean> {

  constructor(private store: Store) {}

  resolve(): boolean {
    this.store.dispatch(loadAllMovies());
    return true;
  }
}
