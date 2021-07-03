import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

import * as countriesLib from 'i18n-iso-countries'
import { User } from '../models/user';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users'


    constructor(private http: HttpClient) {


    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers)

    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`) //Get one category by id 

    }
    createUser(users: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, users)
    }
    deleteUser(userId: string): Observable<User> {
        return this.http.delete<User>(`${this.apiURLUsers}/${userId}`)
    }

    updateUser(users: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${users.id}`, users)

    }

    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }


    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'en');
    }

    getUsersCount(): Observable<{ usercount: number }> {
        return this.http
            .get<{ usercount: number }>(`${this.apiURLUsers}/get/count`)
            .pipe();
    }
}
