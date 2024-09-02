import { Injectable, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetDocumentsService } from './get-documents.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class DocumentSourceService {
  private destroy$: Subject<void> = new Subject<void>();
  private getDocumentService = inject(GetDocumentsService);
  private http =inject(HttpClient);
  private apiUrl = API_URL
  constructor() { }

  private getHttpOptions() {
    const authToken = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
  }

  getDocumentsById(): Observable<any> {
    return this.getDocumentService.getDocumentsByUid()
      .pipe(takeUntil(this.destroy$));
  }
  getDocumentsByAccessCode(): Observable<any> {
    return this.getDocumentService.getDocumentsByAccessCode()
      .pipe(takeUntil(this.destroy$));

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
