import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

@Injectable()
export class UsersService {
    private base = `${environment.usersApi}/users`;
    constructor(private http: HttpClient) { }

    list(): Observable<User[]> {
        return this.http.get<User[]>(this.base);
    }

    get(id: number): Observable<User> {
        return this.http.get<User>(`${this.base}/${id}`);
    }

    create(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.base, user);
    }

    update(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.base}/${id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.base}/${id}`);
    }
}
