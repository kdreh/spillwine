import {inject, Injectable} from '@angular/core';
import {API_URL} from "../../config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AidaService {

private apiUrl= API_URL;
private http = inject(HttpClient);
  constructor() { }

  sendMessage(conversation: any): Observable<any> {
    console.log('Sending message:', conversation);
    return this.http.post<any>(`${this.apiUrl}/aida-chat`, { conversation });
  }

}

