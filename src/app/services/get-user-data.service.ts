import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../models/users";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  private http = inject(HttpClient);

  private getHttpOptions() {
    const userToken = localStorage.getItem('auth_token');
    const authHeader = 'Bearer ' + userToken;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader
      })
    };
  }

  getUserData(): Observable<User> {
    const uid = localStorage.getItem('uid');
    const header = this.getHttpOptions();
    return this.http.get<User>(`/user/${uid}`, header)
      .pipe(
        catchError(this.handleError<any>('getUserData', {}))
      );
  }


  getUserRole():Observable<any | null>{
    return this.getUserData().pipe(
      map(userData =>{
        if(userData && userData.role){
          return userData.role.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getUserRole', null))
    )
  }

  getIsUserOnboarded(): Observable<any | null> {
    return this.getUserData().pipe(
      map(userData => {
        if (userData && userData.onboarded) {
          console.log('User data fetched:', userData);
          return userData.onboarded;
        }
        return null;
      }),
      catchError(this.handleError<string | null>('isOnboarded', null))
    );
  }
  getAccessCode():Observable<any | null> {
    return this.getUserData().pipe(
      map(userData => {
        if(userData && userData.accessCode) {
          return userData.accessCode;
        }
        return null;
      })
    )
  }

  getProfilePicture(): Observable<string | null> {
    return this.getUserData().pipe(
      map(userData => {
        if (userData && userData.profilePic) {
          return userData.profilePic.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getProfilePicture', null))
    );
  }

  getUserName():Observable<string | null> {
    return this.getUserData().pipe(
      map(userData=>{
        if(userData && userData.firstName) {
          return userData.firstName.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getUserName', null))
    )
  }
  getUserLastName():Observable<string | null> {
    return this.getUserData().pipe(
      map(userData=>{
        if(userData && userData.lastName) {
          return userData.lastName.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getUserLastName', null))
    )
  }
  getUserEmail():Observable<string | null> {
    return this.getUserData().pipe(
      map(userData=>{
        if(userData && userData.email) {
          return userData.email.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getUserEmail', null))
    )
  }

  getUserUID ():Observable<string | null> {
    return this.getUserData().pipe(
      map(userData=>{
        if(userData && userData.uid) {
          return userData.uid.toString();
        }
        return null;
      }),
      catchError(this.handleError<string | null>('getUserUID', null))
    )
  }

  getUserBusinessProfile(uid: string): Observable<any> {
    const header = this.getHttpOptions();
    return this.http.get<any>(`/get-user-business-profile/:uid/`, {
      ...header,
      params: { uid }
    })
      .pipe(
        catchError(this.handleError<any>('getUserBusinessProfile', {}))
      );
  }

  private handleError<T>(operation = 'operation', result: T | null = null) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      const safeResult = result !== null ? result : {} as T;

      return of(safeResult);
    };
  }
}
