import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, Observable, map, startWith } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users$: Observable<User[]> | undefined;
    loading$ = new BehaviorSubject(false);

    searchForm: FormGroup;
    private search$ = new BehaviorSubject<string>('');

    constructor(
        private usersService: UsersService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private auth: AuthService,
        private router: Router
    ) {
        this.searchForm = this.fb.group({ q: [''] });
    }

    ngOnInit(): void {
        const control = this.searchForm.get('q')!;
        control.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(v => this.search$.next(v || ''));

        // users$ subscribes to the search$ and always performs an initial load via startWith
        this.users$ = this.search$.pipe(
            startWith(''),
            switchMap(q => {
                this.loading$.next(true);
                return this.usersService.list().pipe(
                    map(list => list.filter(u => u.name.toLowerCase().includes((q || '').toLowerCase())))
                );
            }),
            map(res => {
                this.loading$.next(false);
                return res;
            })
        );

        // ensure initial control value (will emit into search$ via subscription above)
        control.setValue(control.value || '');
    }

    add() {
        const name = prompt('Enter name');
        if (!name) return;
        const payload = { name } as Partial<User>;
        this.usersService.create(payload).subscribe(() => this.snack.open('User added', 'Close', { duration: 2000 }));
    }

    edit(user: User) {
        const name = prompt('Edit name', user.name);
        if (!name) return;
        this.usersService.update(user.id, { ...user, name }).subscribe(() => this.snack.open('User updated', 'Close', { duration: 2000 }));
    }

    delete(user: User) {
        const ok = confirm(`Delete ${user.name}?`);
        if (!ok) return;
        this.usersService.delete(user.id).subscribe(() => this.snack.open('User deleted', 'Close', { duration: 2000 }));
    }

    logout() {
        this.auth.logout();
        this.snack.open('Logged out', 'Close', { duration: 2000 });
        this.router.navigate(['/auth/login']);
    }
}
