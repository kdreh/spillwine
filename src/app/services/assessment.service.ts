import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from "../../config";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private api = API_URL;
  private toastr = inject(ToastrService);
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

  postAssessment(values: any, uid: string, assessmentType: string): Observable<any> {
    // Construct the URL with uid and assessmentType
    const url = `${this.api}/assessment/post/${encodeURIComponent(uid)}/${encodeURIComponent(assessmentType)}`;
    console.log('Requesting POST to:', url); // Debugging line

    // Construct the payload based on provided parameters
    const payload = {
      assessmentType: assessmentType,
      data: values
    };

    return this.http.post<any>(url, payload, this.getHttpOptions()).pipe(
      tap(response => {
        console.log('Assessment posted:', response);
        // Handle the response if needed
        if (response && response.assessment) {
          console.log('Assessment response:', response.assessment);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(() => new Error('Error posting assessment. Please try again later.'));
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = 'An unexpected error occurred';
    if (error.status === 400) {
      errorMessage = 'Bad Request: Please check your input';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized: Please login';
    } else if (error.status === 500) {
      errorMessage = 'Server Error: Please try again later';
    }
    console.error('Error occurred:', error);
    this.toastr.error(errorMessage, 'Error');
  }
}
