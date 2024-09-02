import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Industry, DistributionChannel} from "../models/industry";

import {ToastrService} from "ngx-toastr";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class IndustryListService {


  private api = API_URL;
  private http = inject(HttpClient);

  private toastr = inject(ToastrService);

  constructor() {
  }

  createBusinessProfile(businessProfile: any) {
    console.log(businessProfile);
    return this.http.post(`${this.api}/create-business-profile`, businessProfile)
      .pipe(
        tap((response: any) => {
          console.log('Business profile created successfully:', response);
          // Handle the response if needed
          if (response && response.user && typeof response.user.onboarded !== 'undefined') {
            localStorage.setItem('onboarded', response.user.onboarded.toString());
          }
        }),
        catchError((error: any) => {
          if (error.status === 400 && error.error.message.includes('User already exists')) {
            this.toastr.error('User already exists');
          } else {
            console.error("Error occurred: ", error);
          }
          return throwError(error);
        })
      );
  }


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


  getIndustryAndSubIndustryList(): Observable<Industry[]> {
    return this.http.get<Industry[]>(`${this.api}/industryList`);
  }

  // Fetch distribution list
  getDistributionList(): Observable<DistributionChannel[]> {
    return this.http.get<DistributionChannel[]>(`${this.api}/distributionList`);
  }

  // Fetch distribution channel info
  getDistributionDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/distribution-channel/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('getDistributionChannel', {})));
  }

  // Fetch industry and subindustry by name
  getIndustryDetails(industryId: string, subIndustryId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/get-industry/${industryId}/${subIndustryId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('getSubIndustry', {})));
  }
  private handleError<T>(operation = 'operation', result: T | null = null) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      const safeResult = result !== null ? result : {} as T;
      return of(safeResult);
    };
  }
}
