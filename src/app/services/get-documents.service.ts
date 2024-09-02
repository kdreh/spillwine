import {Injectable, inject, OnDestroy} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, from, Observable, of, switchMap, tap} from 'rxjs';
import {API_URL} from "../../config";
import {UserProfileService} from "./user-profile.service";



@Injectable({
  providedIn: 'root'
})
export class GetDocumentsService implements OnDestroy {
  private apiUrl = API_URL
  private http = inject(HttpClient);

  private userProfileService = inject(UserProfileService);


  constructor() {}

  private getHttpOptions() {
    const authToken = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
  }

  getDocumentsByUid(): Observable<any> {
    return from(
      new Promise<string | null>((resolve) =>
        this.userProfileService.getUserUID((uid) => {
          resolve(uid);
        })
      )
    ).pipe(
      switchMap((uid) =>
        this.http.get<any>(`${this.apiUrl}/user-docs/${uid}`, this.getHttpOptions())

      ),
      tap((data) =>  data),
      /*tap((data) => console.log('Get Documents by ID:', data)),*/
      catchError(this.handleError<any>('getDocumentsByUid', []))
    );
  }
  getDocumentsByAccessCode(): Observable<any> {
    return from(
      new Promise<string | null>((resolve) =>
        this.userProfileService.getAccessCode((accessCode) => {
          resolve(accessCode);
        })
      )
    ).pipe(
      switchMap((accessCode) =>
        this.http.get<any>(`${this.apiUrl}/admin-client-docs/${accessCode}`, this.getHttpOptions())

      ),
      tap((data) => data),
      /*tap((data) => console.log( data)),*/
      catchError(this.handleError<any>('getDocumentsByAccessCode', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('Full error response:', error);
      return of(result as T);
    };
  }

  ngOnDestroy(): void {
  }
}
