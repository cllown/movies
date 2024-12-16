import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userEmail$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.userEmail$ = this.authService.getUserEmail();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
