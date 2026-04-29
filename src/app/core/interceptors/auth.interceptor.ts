import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clone = req;
        const token = this.auth.getToken();
        // Only attach Authorization header to same-origin requests or auth backend
        const isSameOrigin = req.url.startsWith(window.location.origin);
        const isAuthBackend = environment.authApi && req.url.startsWith(environment.authApi);
        if (token && (isSameOrigin || isAuthBackend)) {
            clone = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(clone).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.auth.logout();
                    this.router.navigate(['/auth/login']);
                    this.snack.open('Session expired. Please login again.', 'Close', { duration: 4000 });
                } else if (err.status >= 500) {
                    this.snack.open('Server error. Try later.', 'Close', { duration: 4000 });
                }
                return throwError(() => err);
            })
        );
    }
}
