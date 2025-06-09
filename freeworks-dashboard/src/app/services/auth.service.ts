// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  registerUser(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.token = response.token;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('authToken', response.token);
          }
        }
      })
    );
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
}