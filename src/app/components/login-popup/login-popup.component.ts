import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, ButtonModule, InputTextModule, MessageModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isVisible = true; // Попап будет видим по умолчанию

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.authenticate(email, password).subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.router.navigate(['/favorite']); // Перенаправляем на нужную страницу
            this.isVisible = false; // Закрываем попап при успешной авторизации
          } else {
            this.errorMessage = 'Неверный email или пароль';
          }
        },
        error: (err) => {
          console.error('Authentication error:', err);
          this.errorMessage = 'Ошибка аутентификации. Попробуйте снова.';
        }
      });
    }
  }

  closePopup() {
    this.isVisible = false;
  }
}
