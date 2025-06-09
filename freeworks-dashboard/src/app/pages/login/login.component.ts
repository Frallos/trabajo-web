// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  // Inyecta el AuthService en el constructor
  constructor(private router: Router, private authService: AuthService) { }

  onLogin() {
    // Llama al método loginUser del AuthService y suscríbete a la respuesta
    this.authService.loginUser(this.username, this.password)
      .subscribe({
        next: (response) => {
          alert('Inicio de sesión exitoso. ¡Bienvenido!');
          // Aquí puedes almacenar el token si lo necesitas para futuras peticiones
          // El AuthService ya lo está guardando internamente
          this.router.navigate(['/dashboard']); // Redirige al dashboard
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          // Muestra un mensaje de error más específico si el backend lo proporciona
          alert('Error al iniciar sesión: ' + (error.error.message || 'Credenciales inválidas.'));
        }
      });
  }
}