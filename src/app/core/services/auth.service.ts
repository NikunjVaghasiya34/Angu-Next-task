import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse { token: string; }

@Injectable()
export class AuthService {
    private tokenKey = 'sa_token';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.authApi}/login`, { email, password }).pipe(
            map(res => {
                if (res && (res as any).token) {
                    localStorage.setItem(this.tokenKey, (res as any).token);
                }
                return res as LoginResponse;
            }),
            catchError(err => {
                // Some deployments of Reqres may return a missing_api_key error (api.reqres.in).
                // For local development, fall back to a dev token when using the known test credentials.
                const body = err?.error || {};
                const isReqresKeyError = body?.context === 'invalid_key' || body?.error === 'missing_api_key';
                // Allow multiple dev/test credential pairs to work locally without a real API key
                const devFallbackAccounts: Record<string, string> = {
                    'eve.holt@reqres.in': 'cityslicka',
                    'admin@example.com': 'password123'
                };
                const isDevCreds = !!Object.entries(devFallbackAccounts).find(([e, p]) => e === email && p === password);
                if (!environment.production && isReqresKeyError && isDevCreds) {
                    const fakeToken = email === 'admin@example.com' ? 'admin-dev-token' : 'dev-fallback-token';
                    const fake: LoginResponse = { token: fakeToken };
                    localStorage.setItem(this.tokenKey, fake.token);
                    return of(fake);
                }
                return throwError(() => err);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
