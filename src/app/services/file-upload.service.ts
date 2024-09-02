import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API_URL} from "../../config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private api = API_URL;
  private http = inject(HttpClient);

  constructor() { }

  profilePicUpload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.api}/profile-pic`, formData);
  }

  userUploadFile(formData: FormData): Observable<any> {
    console.log("Upload service ",formData);
    return this.http.post(`${this.api}/user-file-upload`, formData);
  }

  adminUploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.api}/admin-file-upload`, formData);
  }
}
