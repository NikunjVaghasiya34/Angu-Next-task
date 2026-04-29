import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MatDialogModule, MatSnackBarModule, SharedModule]
})
export class DashboardModule { }
