import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieService } from './services/movie/movie.service';
import { AuthService } from './services/auth/auth.service';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    MovieListComponent,
    SidebarComponent,
    RouterModule,
    HeaderComponent,
    LoginPopupComponent,
    ButtonModule,
  ],
})
export class AppComponent {
  isLoginPopupVisible = false;
  isLoginButtonVisible: boolean = true;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  showLoginPopup(): void {
    this.isLoginPopupVisible = true;
  }

  hideLoginPopup(): void {
    this.isLoginPopupVisible = false;
  }

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            this.isLoginButtonVisible = false;
            return this.authService.getAccountId().pipe(
              switchMap((accountId) => {
                this.movieService.setAccountId(accountId);
                console.log('Account ID:', accountId);
                return of(accountId);
              }),
              catchError((error) => {
                console.error('Failed to get account ID:', error);
                return of(null);
              })
            );
          } else {
            this.isLoginButtonVisible = true;
            console.log('User is not authenticated');
            return of(null);
          }
        }),
        catchError((error) => {
          console.error('Failed to check authentication status:', error);
          return of(null);
        })
      )
      .subscribe();
  }
}
