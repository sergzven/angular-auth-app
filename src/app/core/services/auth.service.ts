import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.mode';
import { delay, mergeMap, Observable, of, tap, throwError, timer } from 'rxjs';

const RESPONSE_DELAY = 1500;
const TOKEN_KEY = 'auth_token';
const USERS_KEY = 'users';

// mock-auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User|null>(null)

  constructor() {
    const token = this.getToken();
    if (token) {
      const userData = JSON.parse(atob(token));
      this.getUserByEmail(userData.email)
    }
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  signup(user: User): Observable<any> {
    const users = this.getUsers();
    if (users.find((u) => u.email === user.email)) {
      const throwingError = throwError(() => new Error('User already exists'))
      return timer(RESPONSE_DELAY).pipe(
        tap(() => alert('User already exists.')),
        mergeMap(e => throwingError)
      )
    }
    users.push(user);
    this.saveUsers(users);
    return of({ message: 'Signup successful' }).pipe(delay(RESPONSE_DELAY));
  }

  login(email: string, password: string): Observable<any> {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      const throwingError = throwError(() => new Error('Invalid credentials'))
      return timer(RESPONSE_DELAY).pipe(
        tap(() => alert('Wrong email or password.')),
        mergeMap(e => throwingError)
      )
    }

    this.currentUser.set(user)

    const fakeJwtPayload = {
      email: user.email,
      roles: user.roles,
      exp: Date.now() + 3600 * 1000,
    };
    const token = btoa(JSON.stringify(fakeJwtPayload));
    localStorage.setItem(TOKEN_KEY, token);

    return of({ token }).pipe(delay(RESPONSE_DELAY));
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getUserByEmail(email: string): void {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email
    );

    if(user) {
      this.currentUser.set(user)
    }
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const payload = JSON.parse(atob(token));
    return payload.roles;
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token));
    return Date.now() > payload.exp;
  }
}
