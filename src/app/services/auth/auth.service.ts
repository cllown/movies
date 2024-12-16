import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '10df4df25b93ff563f5e050212816841';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.loadAuthStatus());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string | null>(this.loadUserEmail());
  public userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();
  private showLoginPopupSubject = new BehaviorSubject<boolean>(false);
  public showLoginPopup$: Observable<boolean> = this.showLoginPopupSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadAuthStatus(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private loadUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  public authenticate(email: string, password: string): Observable<boolean> {


    return new Observable<boolean>(observer => {
      setTimeout(() => {
        this.setAuthStatus(true);
        this.userEmailSubject.next(email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        observer.next(true);
        observer.complete();
      }, 1000);
    }).pipe(
      catchError(error => throwError(error))
    );
  }

  private setAuthStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  public getUserEmail(): Observable<string | null> {
    return this.userEmail$;
  }

  public showLoginPopup(): void {
    this.showLoginPopupSubject.next(true);
  }

  public hideLoginPopup(): void {
    this.showLoginPopupSubject.next(false);
  }

  public getAccountId(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/account?api_key=${this.apiKey}`).pipe(
      map(response => response.id),
      catchError(error => throwError(error))
    );
  }

  public logout(): void {
    this.setAuthStatus(false);
    this.userEmailSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  }
}


/*
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
    import { catchError, map, switchMap } from 'rxjs/operators';
    import { MovieService } from '../movie/movie.service';
import { Router } from '@angular/router';

    @Injectable({
      providedIn: 'root'
    })
    export class AuthService {
      private apiUrl = 'https://api.themoviedb.org/3';
      private apiKey = '10df4df25b93ff563f5e050212816841';

      private username = 'artoorclown';
      private password = 'tel56420';

      private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
      private userEmailSubject = new BehaviorSubject<string | null>(null);
      public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
      public userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();

      constructor(private http: HttpClient, private router: Router) { }

      public authenticate(email: string, password: string): Observable<boolean> {
        // Реализуйте метод аутентификации здесь
        return this.http.post<any>(`${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`, { email, password })
            .pipe(
                map(response => response.success), // Пример
                catchError(error => throwError(error))
            );
    }
      // Get the request token
      private getRequestToken(): Observable<string> {
        const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
        return this.http.get<any>(url).pipe(
          map(response => response.request_token),
          catchError(this.handleError)
        );
      }

      private validateRequestToken(requestToken: string): Observable<void> {
        const url = `${this.apiUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
        const body = {
          username: this.username,
          password: this.password,
          request_token: requestToken
        };
        return this.http.post<any>(url, body).pipe(
          map(() => { }),
          catchError(this.handleError)
        );
      }

      // Create a session ID
      private createSession(requestToken: string): Observable<string> {
        const url = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`;
        const body = { request_token: requestToken };
        return this.http.post<any>(url, body).pipe(
          map(response => response.session_id),
          catchError(this.handleError)
        );
      }

      // Get account details to retrieve accountId
      public getAccountId(): Observable<number> {
        // Реализуйте метод для получения accountId
        return this.http.get<any>(`${this.apiUrl}/account?api_key=${this.apiKey}`)
            .pipe(
                map(response => response.id),
                catchError(error => throwError(error))
            );
    }
      public isAuthenticated(): Observable<boolean> {
        return this.isAuthenticated$;
      }

      public getUserEmail(): Observable<string | null> {
        return this.userEmail$;
      }

      public showLoginPopup(): void {
        this.router.navigate(['/login']);
      }

      public logout(): void {
        this.isAuthenticatedSubject.next(false);
        this.userEmailSubject.next(null);
        this.router.navigate(['/']); // Перенаправляем на домашнюю страницу
      }

      private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
      }
    }
 */
