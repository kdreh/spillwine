import {inject, Injectable} from '@angular/core';

import {HttpClient } from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";
import {jwtDecode} from 'jwt-decode';
import {Router} from "@angular/router";
@Injectable({
providedIn: 'root'
})
export class AuthService {

private authenticated:boolean = false;

private http = inject(HttpClient);
private toastr = inject(ToastrService);
private router = inject(Router);

  constructor() {
    this.authenticated = this.isLoggedIn();
  }

  createUserAccount(user: any) {
    localStorage.setItem('email', user.email);
    return this.http.post(`/v1/api/register`, user)
      .pipe(
        tap((response:any) => console.log(response.token)),    // add the 'tap' operator here
        catchError((error: any) => {
          let errorMessage = 'Unknown error'
          if (error.status === 400 || error.status === 409) {
            errorMessage = 'User already exists';
          }

          this.toastr.error(errorMessage);
          return throwError(error);
        })
      );
  }
  signIn(credentials: { email: any, password: any, role: any }): Observable<any> {
    return this.http.post<{ token: string }>(`/v1/api/login`, credentials)
      .pipe(
        tap((result: any) => {
            localStorage.setItem('auth_token', result.token);
            localStorage.setItem('uid', result.cosmosUserId); // I'm not wrapping the 'cosmosUserId' in JSON.stringify as it's just a string ID, not an object
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('onboarded', result.onboard)
          this.authenticated = true;
          this.toastr.success('Sign In successful!');
        }),
        catchError((error: any) => {
          let errorMessage ='An unknown error occurred, please try again.';
          if (error.status === 401 || error.status === 403 || error.status === 401) {
            errorMessage = 'Unauthorized, Please check account information';
          }

          this.toastr.error('Error occurred: ', errorMessage);

          console.error('Error occurred during sign-in: ', error.message);
          return throwError(error);
        })
      );
  }

  isTokenExpired(token: string): boolean {
    const decodeToken:any = jwtDecode(token);
    const expirationTime = decodeToken.exp *1000;

    return Date.now() > expirationTime;
  }
  logOut(){
      localStorage.removeItem('uid');
      localStorage.removeItem('authenticated');
    this.authenticated = false;
    localStorage.clear();
    this.toastr.success("Sign Out successful");
  }

  checkTokenAndSignOut(): void {
      const token = localStorage.getItem('token');
      if (token && this.isTokenExpired(token)) {
          this.logOut();
          this.router.navigate(['/sign-in']);
      }
  }
  isLoggedIn(){
    return localStorage.getItem('authenticated') ==='true';
  }
  isOnboarded(){

    return localStorage.getItem('onboarded') ==='true';
  }

  isAuthenticated() {
    return this.authenticated;
  }

  sendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`/v1/api/send-verification-email`, { email });
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`/v1/api/resend-verification-email`, { email });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`/v1/api/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`v1/api/reset-password?token=${encodeURIComponent(token)}`, { password: newPassword });
  }




}
