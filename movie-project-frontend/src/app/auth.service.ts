import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/API/auth'; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private countdownInterval: any;
  private user: User | null = null;

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  signUp(user: string, email: string, password: string): Observable<any> {
    const body = { username: user, email, password };
    return this.http.post(`${this.apiUrl}/register`, body, this.httpOptions);
  }

  login(email: string, password: string): Observable<any> {
    const body = { username: email, password };
    return this.http.post(`${this.apiUrl}/login`, body, this.httpOptions);
  }

  signInWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        this.setSession();
        localStorage.setItem('userToken', JSON.stringify(result.user));
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.snackBar.open(error.message, 'Close', { duration: 5000 });
      });
  }

  setSession(): void {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem('tokenExpiry', expirationTime.toString());
    this.startCountdown();
  }

  startCountdown(): void {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (!tokenExpiry) {
      return;
    }

    const expirationTime = Number(tokenExpiry);
    const currentTime = new Date().getTime();
    let timeRemaining = expirationTime - currentTime;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      timeRemaining -= 1000;
      console.log(`Time remaining: ${Math.floor(timeRemaining / 1000)} seconds`);
      localStorage.setItem('timeRemaining', timeRemaining.toString());

      if (timeRemaining <= 0) {
        clearInterval(this.countdownInterval);
        this.snackBar.open('Your session has expired. Please log in again.', 'Close', {
          duration: 5000,
        });
        this.logout();
      }
    }, 1000);
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiry');
    this.router.navigate(['/login']);
  }
}