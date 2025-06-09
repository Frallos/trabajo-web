// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  // Inyecta el AuthService en el constructor
  constructor(private router: Router, private authService: AuthService) { }

  onRegister() {
    // Validaciones básicas en el frontend
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (this.password.length < 6) { // Ejemplo de validación mínima
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Llama al método registerUser del AuthService y suscríbete a la respuesta
    this.authService.registerUser(this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          alert('Registro exitoso: ' + response.message);
          this.router.navigate(['/login']); // Redirige de vuelta a la página de login
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          // Muestra un mensaje de error más específico si el backend lo proporciona
          alert('Error al registrar: ' + (error.error.message || 'Inténtalo de nuevo.'));
        }
      });
  }
}