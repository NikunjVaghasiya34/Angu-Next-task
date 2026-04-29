import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MatProgressSpinnerModule, MatSnackBarModule]
})
export class AuthModule { }
