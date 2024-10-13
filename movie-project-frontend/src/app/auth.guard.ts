// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';  // Import the AuthService
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.authState().pipe(
//       map((user) => {
//         const isSessionValid = this.authService.isSessionValid(); 

//         if (user && isSessionValid) {
//           return true;
//         } else if (!isSessionValid) {
//           this.authService.logout(); 
//           return false;
//         } else {
//           this.router.navigate(['/login']);
//           return false;
//         }
//       })
//     );
//   }
// }
