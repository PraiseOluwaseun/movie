import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  signUp() {
    const { user, email, password } = this.signupForm.value;
    this.errorMessage = '';
    
    this.authService.signUp(user, email, password).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
        this.snackBar.open('Signup failed: ' + error.message, 'Close', { duration: 5000 });
      }
    });
  }
  

  
  signUpWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
