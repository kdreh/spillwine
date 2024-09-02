import {inject, Injectable} from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import { Observable, } from 'rxjs';
import {API_URL} from "../../config";

import {ToastrService} from "ngx-toastr";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {

  private apiUrl = API_URL;
  private toastr = inject(ToastrService);
  private document = inject(DOCUMENT);

  constructor(private http: HttpClient) {
  }

  generateAccessCode(uid: string): Observable<any> {
    const body = {uid: uid}
    return this.http.post<any>(`${this.apiUrl}/generate-access-code`, body);
  }

  addAdminAccessCode(uid: any, accessCode: any): Observable<any> {
    const body = {uid: uid, accessCode: accessCode};
    console.log(body);
    return this.http.post<any>(`${this.apiUrl}/access-code`, body);
  }

  removeAccessCode(accessCode: any, uid: any): Observable<any> {
    const body = {uid: uid, accessCode: accessCode};
    return this.http.put<any>(`${this.apiUrl}/remove-access`, body);
  }

  getUsersByAccessCode(accessCode: any): Observable<any> {
    console.log(accessCode);
    return this.http.get<any>(`${this.apiUrl}/users-list/${accessCode}`);
  }


  /*
  Reusable methods
   */
  deleteAccessCode(uid: any, accessCode: any) {
    return this.removeAccessCode(uid, accessCode).subscribe({
      next: () => {
        this.toastr.success('Access code removed successfully');
      },
      error: (error) => {
        this.toastr.error('Access code could not be removed');
        console.error(error);
      }
    });
  }

  async copyToClipboard(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      this.toastr.success('Copied to clipboard','',{positionClass:'toast-top-center'});
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  }
  shareViaEmail(content: string) {
    const emailBody = `Hello, here is my access code: ${content}`;
    window.location.href = `mailto:?subject=Access Code&body=${emailBody}`;
  }
}
