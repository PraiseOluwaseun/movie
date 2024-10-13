import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  login() {
    const { user, password } = this.loginForm.value;
    this.errorMessage = '';
  
    this.authService.login(user, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/T3movies']); 
      },
      error: (error) => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed: ' + error.message, 'Close', { duration: 5000 });
      }
    });
  }
  

 
  loginWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
