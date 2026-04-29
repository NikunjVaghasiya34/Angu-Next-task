import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loading = false;
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
    errorMsg = '';

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snack: MatSnackBar) { }

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }

    submit() {
        this.errorMsg = '';
        if (this.form.invalid) return this.form.markAllAsTouched();
        this.loading = true;
        const { email, password } = this.form.value;
        this.auth.login(email!, password!).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.loading = false;
                const message = err?.error?.error || err?.message || 'Login failed. Check credentials.';
                this.errorMsg = message;
                this.snack.open(message, 'Close', { duration: 4000 });
            }
        });
    }
}
