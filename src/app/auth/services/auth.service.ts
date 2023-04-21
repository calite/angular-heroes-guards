import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined | null {
        if (!this.user) return undefined;
        return structuredClone(this.user); //realiza una copia/clon del objeto
    }

    login(email: string, password: string): Observable<User> {

        // http.post('login',{email, password});

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', 'asdjkajdsajsdjasd2')),
            );
    }

    checkAuthentication() : Observable<boolean> {

        if ( !localStorage.getItem('token') ) return of ( false ) //revisamos token
        
        const token = localStorage.getItem('token'); 

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user ),
                map( user => !!user ), //doble negacion, miramos si existe el user
                catchError( err => of (false))
            );
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

}